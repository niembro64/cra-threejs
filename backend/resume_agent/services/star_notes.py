from __future__ import annotations

from hashlib import sha256
import json
from pathlib import Path
from typing import Any, Iterable

from django.db import transaction

from resume_agent.models import StarNote

from .embeddings import embedding_client


DISPLAY_CELLS = ("situation", "task", "action", "result")
EMBEDDING_BATCH_SIZE = 32


class StarNoteCorpusError(ValueError):
    pass


def _required_strings(value: Any, field: str, note_id: str) -> list[str]:
    if not isinstance(value, list) or not value:
        raise StarNoteCorpusError(f"{note_id}.{field} must be a non-empty array")
    if not all(isinstance(item, str) and item.strip() for item in value):
        raise StarNoteCorpusError(f"{note_id}.{field} must contain non-empty strings")
    return [item.strip() for item in value]


def validate_note(raw_note: Any, source_order: int) -> dict[str, Any]:
    if not isinstance(raw_note, dict):
        raise StarNoteCorpusError(f"Item {source_order + 1} must be an object")

    note_id = raw_note.get("id")
    title = raw_note.get("title")
    question = raw_note.get("question")
    if not isinstance(note_id, str) or not note_id.strip():
        raise StarNoteCorpusError(f"Item {source_order + 1} requires an id")
    if not isinstance(title, str) or not title.strip():
        raise StarNoteCorpusError(f"{note_id}.title must be a non-empty string")
    if not isinstance(question, str) or not question.strip():
        raise StarNoteCorpusError(f"{note_id}.question must be a non-empty string")

    normalized = {
        "id": note_id.strip(),
        "title": title.strip(),
        "question": question.strip(),
        "themes": _required_strings(raw_note.get("themes"), "themes", note_id),
        "aliases": _required_strings(raw_note.get("aliases"), "aliases", note_id),
        "source_order": source_order,
    }
    for cell in DISPLAY_CELLS:
        bullets = _required_strings(raw_note.get(cell), cell, note_id)
        if len(bullets) > 4:
            raise StarNoteCorpusError(f"{note_id}.{cell} exceeds four bullets")
        for bullet in bullets:
            if len(bullet.split()) > 10:
                raise StarNoteCorpusError(f"{note_id}.{cell} exceeds ten words: {bullet}")
        normalized[cell] = bullets
    return normalized


def load_corpus(path: Path) -> list[dict[str, Any]]:
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise StarNoteCorpusError(f"Unable to read STAR corpus: {exc}") from exc
    if not isinstance(payload, list) or not payload:
        raise StarNoteCorpusError("STAR corpus must be a non-empty array")

    notes = [validate_note(raw_note, index) for index, raw_note in enumerate(payload)]
    note_ids = [note["id"] for note in notes]
    if len(note_ids) != len(set(note_ids)):
        raise StarNoteCorpusError("STAR corpus contains duplicate ids")
    return notes


def build_search_text(note: dict[str, Any]) -> str:
    return "\n".join(
        (
            f"STAR interview story: {note['title']}",
            f"Sample question: {note['question']}",
            f"Question themes: {', '.join(note['themes'])}",
            f"Related interview prompts: {'; '.join(note['aliases'])}",
            f"Situation: {' '.join(note['situation'])}",
            f"Task: {' '.join(note['task'])}",
            f"Action: {' '.join(note['action'])}",
            f"Result: {' '.join(note['result'])}",
        )
    )


def _batches(values: list[str], size: int) -> Iterable[list[str]]:
    for start in range(0, len(values), size):
        yield values[start : start + size]


def sync_corpus(path: Path) -> dict[str, int]:
    notes = load_corpus(path)
    prepared: list[dict[str, Any]] = []
    for note in notes:
        search_text = build_search_text(note)
        content_hash = sha256(search_text.encode("utf-8")).hexdigest()
        prepared.append({**note, "search_text": search_text, "content_hash": content_hash})

    existing = {note.note_id: note for note in StarNote.objects.all()}
    changed = [
        note
        for note in prepared
        if note["id"] not in existing
        or existing[note["id"]].content_hash != note["content_hash"]
        or existing[note["id"]].embedding is None
    ]

    vectors: list[list[float]] = []
    texts = [note["search_text"] for note in changed]
    for batch in _batches(texts, EMBEDDING_BATCH_SIZE):
        vectors.extend(embedding_client.embed_passages(batch))
    vectors_by_id = {note["id"]: vector for note, vector in zip(changed, vectors)}

    created = 0
    updated = 0
    active_ids = {note["id"] for note in prepared}
    with transaction.atomic():
        for note in prepared:
            current = existing.get(note["id"])
            defaults: dict[str, Any] = {
                "title": note["title"],
                "search_text": note["search_text"],
                "content_hash": note["content_hash"],
                "source_order": note["source_order"],
                "active": True,
            }
            if note["id"] in vectors_by_id:
                defaults["embedding"] = vectors_by_id[note["id"]]
            elif current is not None:
                defaults["embedding"] = current.embedding

            _, was_created = StarNote.objects.update_or_create(
                note_id=note["id"],
                defaults=defaults,
            )
            created += int(was_created)
            updated += int(not was_created)

        deactivated = StarNote.objects.exclude(note_id__in=active_ids).filter(active=True).update(active=False)

    return {
        "total": len(prepared),
        "embedded": len(changed),
        "created": created,
        "updated": updated,
        "deactivated": deactivated,
    }
