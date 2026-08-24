from pathlib import Path
from tempfile import TemporaryDirectory
from unittest.mock import patch
import json

from django.core.management import call_command
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from resume_agent.models import StarNote


DIMENSIONS = 384


def vector(first: float, second: float = 0.0) -> list[float]:
    return [first, second, *([0.0] * (DIMENSIONS - 2))]


class StarNoteSearchTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        StarNote.objects.create(
            note_id="matching",
            title="Matching",
            search_text="matching",
            content_hash="a" * 64,
            embedding=vector(1.0),
            source_order=1,
        )
        StarNote.objects.create(
            note_id="opposite",
            title="Opposite",
            search_text="opposite",
            content_hash="b" * 64,
            embedding=vector(-1.0),
            source_order=0,
        )

    @patch("resume_agent.star_notes_views.embedding_client.embed_query", return_value=vector(1.0))
    def test_returns_every_active_note_in_cosine_order(self, _embed_query):
        response = self.client.post(
            reverse("star-note-search"),
            {"query": "matching technical story"},
            secure=True,
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["strategy"], "exact_pgvector_cosine")
        self.assertEqual([item["id"] for item in response.data["results"]], ["matching", "opposite"])
        self.assertEqual(response.data["result_count"], 2)

    def test_rejects_short_queries(self):
        response = self.client.post(reverse("star-note-search"), {"query": "x"}, secure=True)
        self.assertEqual(response.status_code, 400)


class SyncStarNotesTests(TestCase):
    @patch("resume_agent.services.star_notes.embedding_client.embed_passages")
    def test_syncs_hidden_context_and_deactivates_removed_notes(self, embed_passages):
        embed_passages.return_value = [vector(1.0)]
        StarNote.objects.create(
            note_id="removed",
            title="Removed",
            search_text="removed",
            content_hash="c" * 64,
            embedding=vector(1.0),
        )
        payload = [
            {
                "id": "current",
                "title": "Current card",
                "question": "Tell me about current work.",
                "themes": ["hidden theme"],
                "aliases": ["alternate question"],
                "situation": ["Short situation."],
                "task": ["Short task."],
                "action": ["Short action."],
                "result": ["Short result."],
            }
        ]

        with TemporaryDirectory() as directory:
            path = Path(directory) / "starNotes.json"
            path.write_text(json.dumps(payload), encoding="utf-8")
            call_command("sync_star_notes", path=path)

        current = StarNote.objects.get(note_id="current")
        self.assertIn("Interview competencies and technical context: hidden theme", current.search_text)
        self.assertIn("Related interview prompts: alternate question", current.search_text)
        self.assertFalse(StarNote.objects.get(note_id="removed").active)
