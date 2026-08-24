from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone as datetime_timezone
import hashlib
import json
import logging
from pathlib import Path

from django.conf import settings
from django.db import transaction
from django.utils import timezone

from resume_agent.models import KnowledgeChunk, KnowledgeChunkEmbedding, KnowledgeDocument

from .documents import SUPPORTED_EXTENSIONS, chunk_document, parse_document, redact_dates_and_years
from .embeddings import EmbeddingRequestError, embedding_client


logger = logging.getLogger(__name__)
INDEX_MANIFEST_FILENAME = "index-manifest.json"
EMBEDDING_BATCH_SIZE = 16


@dataclass
class SyncResult:
    indexed: int = 0
    unchanged: int = 0
    inactive: int = 0
    errors: int = 0
    chunks: int = 0
    representations: int = 0
    vector_enabled: bool = False


@dataclass(frozen=True)
class PublicKnowledgeSource:
    path: Path
    relative_path: str
    labels: tuple[str, ...] = ()
    context: str = ""


def _digest(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def _all_public_files(root: Path) -> list[Path]:
    root = root.resolve()
    files = []
    for path in root.rglob("*"):
        if (
            path.is_symlink()
            or not path.is_file()
            or path.name.startswith(".")
            or path.name == INDEX_MANIFEST_FILENAME
        ):
            continue
        if path.suffix.lower() not in SUPPORTED_EXTENSIONS:
            continue
        resolved = path.resolve()
        if root not in resolved.parents:
            continue
        files.append(resolved)
    return sorted(files)


def _normalize_labels(value) -> tuple[str, ...]:
    if not isinstance(value, list):
        raise ValueError("Knowledge manifest labels must be a list")
    labels = []
    for item in value:
        if not isinstance(item, str) or not item.strip():
            raise ValueError("Knowledge manifest labels must be non-empty strings")
        label = " ".join(item.lower().split())[:100]
        if label not in labels:
            labels.append(label)
    return tuple(labels)


def _manifest_sources(root: Path) -> list[PublicKnowledgeSource] | None:
    manifest_path = root / INDEX_MANIFEST_FILENAME
    if not manifest_path.exists():
        return None

    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        raise ValueError(f"Unable to read {INDEX_MANIFEST_FILENAME}: {exc}") from exc

    if manifest.get("version") != 1 or not isinstance(manifest.get("documents"), list):
        raise ValueError("Knowledge manifest must use version 1 and contain a documents list")

    root = root.resolve()
    sources: list[PublicKnowledgeSource] = []
    seen_paths: set[str] = set()
    for item in manifest["documents"]:
        if not isinstance(item, dict):
            raise ValueError("Each knowledge manifest document must be an object")
        relative_path = item.get("path")
        if not isinstance(relative_path, str) or not relative_path.strip():
            raise ValueError("Each knowledge manifest document requires a path")
        relative_path = Path(relative_path).as_posix().lstrip("/")
        if relative_path in seen_paths:
            raise ValueError(f"Duplicate knowledge manifest path: {relative_path}")

        path = (root / relative_path).resolve()
        if root not in path.parents or path.is_symlink() or not path.is_file():
            raise ValueError(f"Knowledge manifest path is missing or unsafe: {relative_path}")
        if path.suffix.lower() not in SUPPORTED_EXTENSIONS:
            raise ValueError(f"Knowledge manifest path has an unsupported type: {relative_path}")

        labels = _normalize_labels(item.get("labels", []))
        context = item.get("context", "")
        if not isinstance(context, str):
            raise ValueError(f"Knowledge manifest context must be text: {relative_path}")
        context = " ".join(context.split())[:1000]
        if not labels or not context:
            raise ValueError(f"Knowledge manifest requires labels and context: {relative_path}")

        sources.append(
            PublicKnowledgeSource(
                path=path,
                relative_path=relative_path,
                labels=labels,
                context=context,
            )
        )
        seen_paths.add(relative_path)
    if not sources:
        raise ValueError("Knowledge manifest must select at least one document")
    return sources


def _public_sources(root: Path) -> list[PublicKnowledgeSource]:
    manifest_sources = _manifest_sources(root)
    if manifest_sources is not None:
        return manifest_sources
    return [
        PublicKnowledgeSource(
            path=path,
            relative_path=path.relative_to(root.resolve()).as_posix(),
        )
        for path in _all_public_files(root)
    ]


def _embed_chunks(contents: list[str]) -> list[list[float] | None]:
    if not embedding_client.available:
        return [None] * len(contents)

    vectors: list[list[float]] = []
    for start in range(0, len(contents), EMBEDDING_BATCH_SIZE):
        vectors.extend(
            embedding_client.embed_passages(contents[start : start + EMBEDDING_BATCH_SIZE])
        )
    return vectors


def _chunk_representation_texts(
    *,
    document_title: str,
    labels: tuple[str, ...],
    context: str,
    heading: str,
    content: str,
) -> dict[str, str]:
    person = "Person: Eric Niemeyer"
    title = f"Document title: {document_title}"
    section = f"Section title and breadcrumb: {heading}" if heading else ""
    categories = f"Categories and search labels: {', '.join(labels)}" if labels else ""
    document_context = f"Document context: {context}" if context else ""
    passage = f"Passage: {content}"

    def joined(*parts: str) -> str:
        return "\n".join(part for part in parts if part)

    return {
        KnowledgeChunkEmbedding.Kind.IDENTITY: joined(person, title, section),
        KnowledgeChunkEmbedding.Kind.TAXONOMY: joined(
            person,
            title,
            section,
            categories,
            document_context,
        ),
        KnowledgeChunkEmbedding.Kind.CONTENT: joined(person, title, section, passage),
        KnowledgeChunkEmbedding.Kind.CONTEXTUAL: joined(
            person,
            title,
            categories,
            document_context,
            section,
            passage,
        ),
    }


def _index_signature() -> dict[str, str | int | None]:
    return {
        "embedding_model": (
            settings.RESUME_AGENT_EMBEDDING_MODEL if embedding_client.available else None
        ),
        "embedding_dimensions": (
            settings.RESUME_AGENT_EMBEDDING_DIMENSIONS if embedding_client.available else None
        ),
        "chunk_characters": settings.RESUME_AGENT_CHUNK_CHARACTERS,
        "chunk_overlap_characters": settings.RESUME_AGENT_CHUNK_OVERLAP_CHARACTERS,
        "content_redaction": "dates-and-years-v1",
        "section_hierarchy": "markdown-breadcrumbs-v1",
        "embedding_context": "identity-taxonomy-content-contextual-v2",
    }


def sync_public_knowledge(force: bool = False) -> SyncResult:
    root = Path(settings.RESUME_AGENT_PUBLIC_KNOWLEDGE_DIR).resolve()
    root.mkdir(parents=True, exist_ok=True)
    result = SyncResult(vector_enabled=embedding_client.available)
    index_signature = _index_signature()
    seen_paths: set[str] = set()

    for source in _public_sources(root):
        path = source.path
        relative_path = source.relative_path
        seen_paths.add(relative_path)
        stat = path.stat()
        max_bytes = settings.RESUME_AGENT_MAX_DOCUMENT_MB * 1024 * 1024
        document, _ = KnowledgeDocument.objects.get_or_create(
            source_path=relative_path,
            defaults={"title": path.stem, "status": KnowledgeDocument.Status.INACTIVE},
        )

        try:
            if stat.st_size > max_bytes:
                raise ValueError(f"Document is larger than {settings.RESUME_AGENT_MAX_DOCUMENT_MB} MB")

            sha256 = _digest(path)
            redacted_labels = tuple(
                label
                for label in (redact_dates_and_years(value) for value in source.labels)
                if label
            )
            redacted_context = redact_dates_and_years(source.context)
            chunk_count = document.chunks.count()
            missing_embeddings = embedding_client.available and (
                document.chunks.filter(embedding__isnull=True).exists()
                or KnowledgeChunkEmbedding.objects.filter(
                    chunk__document=document
                ).count()
                != chunk_count * len(KnowledgeChunkEmbedding.Kind.values)
            )
            outdated_index = document.metadata.get("index_signature") != index_signature
            outdated_manifest_context = (
                document.metadata.get("labels") != list(redacted_labels)
                or document.metadata.get("context") != redacted_context
            )
            if (
                not force
                and document.sha256 == sha256
                and document.status in {
                    KnowledgeDocument.Status.INDEXED,
                    KnowledgeDocument.Status.KEYWORD_ONLY,
                }
                and not missing_embeddings
                and not outdated_index
                and not outdated_manifest_context
            ):
                result.unchanged += 1
                continue

            parsed = parse_document(path)
            redacted_title = redact_dates_and_years(parsed.title) or "Public resume document"
            redacted_text = redact_dates_and_years(parsed.text)
            parsed_chunks = chunk_document(
                redacted_text,
                target_characters=settings.RESUME_AGENT_CHUNK_CHARACTERS,
                overlap_characters=settings.RESUME_AGENT_CHUNK_OVERLAP_CHARACTERS,
            )
            if not parsed_chunks:
                raise ValueError("Document did not produce any searchable chunks")
            representation_payloads = [
                (chunk_index, kind, search_text)
                for chunk_index, chunk in enumerate(parsed_chunks)
                for kind, search_text in _chunk_representation_texts(
                    document_title=redacted_title,
                    labels=redacted_labels,
                    context=redacted_context,
                    heading=chunk.heading,
                    content=chunk.content,
                ).items()
            ]
            vectors = _embed_chunks(
                [search_text for _, _, search_text in representation_payloads]
            )
            vector_by_chunk_and_kind = {
                (chunk_index, kind): vector
                for (chunk_index, kind, _), vector in zip(representation_payloads, vectors)
            }
            modified_at = datetime.fromtimestamp(stat.st_mtime, tz=datetime_timezone.utc)

            with transaction.atomic():
                document.title = redacted_title
                document.sha256 = sha256
                document.content_type = parsed.content_type
                document.size_bytes = stat.st_size
                document.modified_at = modified_at
                document.indexed_at = timezone.now()
                document.status = (
                    KnowledgeDocument.Status.INDEXED
                    if embedding_client.available
                    else KnowledgeDocument.Status.KEYWORD_ONLY
                )
                document.error_message = ""
                document.metadata = {
                    "chunk_count": len(parsed_chunks),
                    "index_signature": index_signature,
                    "labels": list(redacted_labels),
                    "context": redacted_context,
                }
                document.save()
                document.chunks.all().delete()
                chunk_rows = KnowledgeChunk.objects.bulk_create(
                    [
                        KnowledgeChunk(
                            document=document,
                            ordinal=index,
                            heading=chunk.heading,
                            content=chunk.content,
                            token_estimate=chunk.token_estimate,
                            embedding=vector_by_chunk_and_kind[
                                (index, KnowledgeChunkEmbedding.Kind.CONTEXTUAL)
                            ],
                            metadata={
                                "labels": list(redacted_labels),
                                "context": redacted_context,
                                "breadcrumb": chunk.heading,
                            },
                        )
                        for index, chunk in enumerate(parsed_chunks)
                    ]
                )
                embedding_rows = [
                    KnowledgeChunkEmbedding(
                        chunk=chunk_rows[chunk_index],
                        kind=kind,
                        search_text=search_text,
                        embedding=vector,
                    )
                    for (chunk_index, kind, search_text), vector in zip(
                        representation_payloads,
                        vectors,
                    )
                    if vector is not None
                ]
                KnowledgeChunkEmbedding.objects.bulk_create(embedding_rows)
            result.indexed += 1
            result.chunks += len(parsed_chunks)
            result.representations += len(embedding_rows)
        except (OSError, UnicodeError, ValueError, EmbeddingRequestError) as exc:
            logger.warning("Unable to index %s: %s", relative_path, exc)
            document.status = KnowledgeDocument.Status.ERROR
            document.error_message = str(exc)[:2000]
            document.save(update_fields=("status", "error_message", "updated_at"))
            result.errors += 1

    active_documents = KnowledgeDocument.objects.exclude(status=KnowledgeDocument.Status.INACTIVE)
    for document in active_documents.exclude(source_path__in=seen_paths):
        document.chunks.all().delete()
        document.status = KnowledgeDocument.Status.INACTIVE
        document.error_message = "Source file was removed from the public knowledge directory"
        document.save(update_fields=("status", "error_message", "updated_at"))
        result.inactive += 1

    return result
