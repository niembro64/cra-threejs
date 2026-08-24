from pathlib import Path

from django.core.management.base import BaseCommand, CommandError

from resume_agent.services.star_notes import StarNoteCorpusError, sync_corpus


class Command(BaseCommand):
    help = "Validate, embed, and synchronize the STAR interview-note corpus"

    def add_arguments(self, parser):
        parser.add_argument(
            "--path",
            type=Path,
            default=Path(__file__).resolve().parents[2] / "data" / "starNotes.json",
        )

    def handle(self, *args, **options):
        try:
            counts = sync_corpus(options["path"])
        except StarNoteCorpusError as exc:
            raise CommandError(str(exc)) from exc

        self.stdout.write(
            self.style.SUCCESS(
                "Synchronized {total} STAR cards: {created} created, {updated} updated, "
                "{embedded} embedded, {deactivated} deactivated.".format(**counts)
            )
        )
