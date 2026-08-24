from unittest.mock import patch

from django.test import SimpleTestCase

from resume_agent.services.ingestion import EMBEDDING_BATCH_SIZE, _embed_chunks


class KnowledgeEmbeddingBatchTests(SimpleTestCase):
    @patch("resume_agent.services.ingestion.embedding_client")
    def test_splits_large_document_embedding_requests(self, embedding_client):
        embedding_client.available = True
        embedding_client.embed_passages.side_effect = lambda texts: [[0.0] for _ in texts]
        texts = [f"contextual passage {index}" for index in range(EMBEDDING_BATCH_SIZE * 2 + 3)]

        vectors = _embed_chunks(texts)

        self.assertEqual(len(vectors), len(texts))
        self.assertEqual(
            [len(call.args[0]) for call in embedding_client.embed_passages.call_args_list],
            [EMBEDDING_BATCH_SIZE, EMBEDDING_BATCH_SIZE, 3],
        )
