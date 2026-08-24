# niemo.io backend overlay

The production Django backend lives at `/srv/niemo/backend` on `awow`. This directory versions the
files added or changed by the STAR Notes semantic-ranking feature so frontend and backend releases
remain traceable in the same repository.

The overlay also versions the public-knowledge ingestion service. Embedding requests are deliberately
batched for the CPU-only `awow` host so long context-rich documents stay within the local model's
request timeout.

`src/data/starNotes.json` is the canonical corpus. Deployment copies that file to
`/srv/niemo/backend/resume_agent/data/starNotes.json`, applies the included migration, and runs
`python manage.py sync_star_notes`.
