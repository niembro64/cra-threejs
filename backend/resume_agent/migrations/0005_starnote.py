from django.db import migrations, models
from pgvector.django import VectorField


class Migration(migrations.Migration):
    dependencies = [
        ("resume_agent", "0004_knowledgechunkembedding"),
    ]

    operations = [
        migrations.CreateModel(
            name="StarNote",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("note_id", models.CharField(max_length=120, unique=True)),
                ("title", models.CharField(max_length=255)),
                ("search_text", models.TextField()),
                ("content_hash", models.CharField(max_length=64)),
                (
                    "embedding",
                    VectorField(
                        blank=True,
                        dimensions=384,
                        null=True,
                    ),
                ),
                ("source_order", models.PositiveIntegerField(default=0)),
                ("active", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "ordering": ("source_order", "note_id"),
            },
        ),
        migrations.AddIndex(
            model_name="starnote",
            index=models.Index(
                fields=["active", "source_order"],
                name="resume_star_active_order_idx",
            ),
        ),
    ]
