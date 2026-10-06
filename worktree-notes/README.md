# Confirmation notes

Shared correction notes for the worktree confirmation section. This store is independent of the existing homepage checkbox Worker.

Public-link editing, not an authenticated staff portal. CORS restricts browser callers to the shared GitHub Pages origin; it is not authentication. Do not put patient data or credentials in notes.

Worker: bb-worktree-confirmation-notes. SQLite Durable Object: ConfirmationNotes / confirmation-v1. GET and POST /v1/notes use X-BB-Worktree: notes-v1. POST requires id, text, author, rev, requestId. Revision conflict returns 409; the UI keeps the local draft. Matching requestId retries are idempotent. History retains 12 prior revisions. No public deletion/reset route.

Deployed 2026-10-06, version 823300f0-c012-49d8-aebd-0f38787c0743. Frontend canonical source: lovart-out/2026-09-21_sheet-navigator/confirmation-notes.js and .css (workspace). Published inline in worktree/index.html.

Do not rerun the initial migration under a different name. Existing 193 homepage checkbox cells were verified unchanged. Full QA: output/2026-10-06_volnewmer-worktree/.
