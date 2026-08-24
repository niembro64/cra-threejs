# niemo.io backend overlay

The production Django backend lives at `/srv/niemo/backend` on `awow`. This directory versions the
files added or changed by the STAR Notes semantic-ranking feature so frontend and backend releases
remain traceable in the same repository.

`src/data/starNotes.json` is the canonical corpus. Deployment copies that file to
`/srv/niemo/backend/resume_agent/data/starNotes.json`, applies the included migration, and runs
`python manage.py sync_star_notes`.
