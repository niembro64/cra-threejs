from django.core.management.base import BaseCommand, CommandError
from django.db.models import F
from pgvector.django import CosineDistance

from resume_agent.models import StarNote
from resume_agent.services.embeddings import EmbeddingRequestError, embedding_client


class Command(BaseCommand):
    help = "Print the highest-ranking STAR cards for one or more interview questions"

    def add_arguments(self, parser):
        parser.add_argument("queries", nargs="+")
        parser.add_argument("--limit", type=int, default=5)

    def handle(self, *args, **options):
        limit = max(1, min(options["limit"], 20))
        for query in options["queries"]:
            try:
                query_vector = embedding_client.embed_query(query)
            except EmbeddingRequestError as exc:
                raise CommandError(str(exc)) from exc

            ranked_notes = (
                StarNote.objects.filter(active=True, embedding__isnull=False)
                .annotate(distance=CosineDistance(F("embedding"), query_vector))
                .order_by("distance", "source_order", "note_id")[:limit]
            )
            self.stdout.write(f"QUERY: {query}")
            for note in ranked_notes:
                score = 1.0 - float(note.distance)
                self.stdout.write(f"  {score:.3f} {note.note_id}")
