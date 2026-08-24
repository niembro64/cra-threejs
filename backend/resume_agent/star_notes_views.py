from __future__ import annotations

from django.db.models import F
from pgvector.django import CosineDistance
from rest_framework import serializers, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView

from resume_agent.models import StarNote
from resume_agent.services.embeddings import (
    EmbeddingConfigurationError,
    EmbeddingRequestError,
    embedding_client,
)


class StarNoteSearchSerializer(serializers.Serializer):
    query = serializers.CharField(min_length=3, max_length=1000, trim_whitespace=True)


class StarNoteSearchView(APIView):
    authentication_classes = ()
    permission_classes = (AllowAny,)
    throttle_classes = (ScopedRateThrottle,)
    throttle_scope = "resume_agent_search"

    def post(self, request):
        serializer = StarNoteSearchSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        query = serializer.validated_data["query"]

        try:
            query_vector = embedding_client.embed_query(query)
        except (EmbeddingConfigurationError, EmbeddingRequestError):
            return Response(
                {"detail": "Semantic ranking is temporarily unavailable."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        ranked_notes = (
            StarNote.objects.filter(active=True, embedding__isnull=False)
            .annotate(distance=CosineDistance(F("embedding"), query_vector))
            .order_by("distance", "source_order", "note_id")
        )
        results = [
            {
                "id": note.note_id,
                "score": max(-1.0, min(1.0, 1.0 - float(note.distance))),
            }
            for note in ranked_notes
        ]
        response = Response(
            {
                "query": query,
                "strategy": "exact_pgvector_cosine",
                "result_count": len(results),
                "results": results,
            }
        )
        response["Cache-Control"] = "private, no-store"
        return response
