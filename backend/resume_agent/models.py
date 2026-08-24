from django.contrib.postgres.search import SearchVectorField
from django.db import models
from pgvector.django import VectorField


class KnowledgeDocument(models.Model):
    class Status(models.TextChoices):
        INDEXED = "indexed", "Indexed"
        KEYWORD_ONLY = "keyword_only", "Indexed without embeddings"
        ERROR = "error", "Error"
        INACTIVE = "inactive", "Inactive"

    source_path = models.CharField(max_length=1024, unique=True)
    title = models.CharField(max_length=255)
    sha256 = models.CharField(max_length=64, blank=True)
    content_type = models.CharField(max_length=32, blank=True)
    size_bytes = models.PositiveBigIntegerField(default=0)
    modified_at = models.DateTimeField(null=True, blank=True)
    indexed_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(
        max_length=32,
        choices=Status.choices,
        default=Status.INACTIVE,
        db_index=True,
    )
    error_message = models.TextField(blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("source_path",)

    def __str__(self) -> str:
        return self.title

class KnowledgeChunk(models.Model):
    document = models.ForeignKey(
        KnowledgeDocument,
        on_delete=models.CASCADE,
        related_name="chunks",
    )
    ordinal = models.PositiveIntegerField()
    heading = models.CharField(max_length=500, blank=True)
    content = models.TextField()
    token_estimate = models.PositiveIntegerField(default=0)
    embedding = VectorField(dimensions=384, null=True, blank=True)
    search_vector = SearchVectorField(null=True, blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("document_id", "ordinal")
        constraints = [
            models.UniqueConstraint(
                fields=("document", "ordinal"),
                name="resume_agent_unique_document_chunk",
            )
        ]

    def __str__(self) -> str:
        return f"{self.document.title} #{self.ordinal}"


class KnowledgeChunkEmbedding(models.Model):
    class Kind(models.TextChoices):
        IDENTITY = "identity", "Identity"
        TAXONOMY = "taxonomy", "Taxonomy"
        CONTENT = "content", "Content"
        CONTEXTUAL = "contextual", "Contextual"

    chunk = models.ForeignKey(
        KnowledgeChunk,
        on_delete=models.CASCADE,
        related_name="embeddings",
    )
    kind = models.CharField(max_length=32, choices=Kind.choices)
    search_text = models.TextField()
    embedding = VectorField(dimensions=384)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("chunk_id", "kind")
        constraints = [
            models.UniqueConstraint(
                fields=("chunk", "kind"),
                name="resume_agent_unique_chunk_embedding_kind",
            )
        ]

    def __str__(self) -> str:
        return f"{self.chunk} [{self.kind}]"


class ResumeSearchConversationState(models.Model):
    conversation_key = models.CharField(max_length=64, unique=True)
    seen_chunk_ids = models.JSONField(default=list, blank=True)
    search_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=("updated_at",), name="resume_state_updated_idx"),
        ]

    def __str__(self) -> str:
        return f"Resume search state {self.conversation_key[:12]}"


class StarNote(models.Model):
    note_id = models.CharField(max_length=120, unique=True)
    title = models.CharField(max_length=255)
    search_text = models.TextField()
    content_hash = models.CharField(max_length=64)
    embedding = VectorField(dimensions=384, null=True, blank=True)
    source_order = models.PositiveIntegerField(default=0)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("source_order", "note_id")
        indexes = [
            models.Index(
                fields=("active", "source_order"),
                name="resume_star_active_order_idx",
            ),
        ]

    def __str__(self) -> str:
        return self.title
