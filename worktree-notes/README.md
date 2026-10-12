# Confirmation notes

Shared correction notes for worktree confirmation and country-specific language review. This store is independent of the existing homepage checkbox Worker.

Public-link editing, not an authenticated staff portal. CORS restricts browser callers to the shared GitHub Pages origin; it is not authentication. Do not put patient data or credentials in notes.

Worker: bb-worktree-confirmation-notes. SQLite Durable Object: ConfirmationNotes / confirmation-v1. GET and POST /v1/notes use X-BB-Worktree: notes-v1. The existing object identity and migration remain unchanged.

POST requires id, text, author, rev, requestId. Empty text is allowed, so completed requests can be cleared through edit and save. DELETE is not supported, including from old cached clients. Existing IDs (R07, BASE01, CUSTOM-UUID) retain their original notes. A country suffix (R07/EN, R07/JP, CN, TW, TH, HK) stores a separate note. Revision conflict returns 409; the UI retains the local draft. Matching requestId retries are idempotent for saves, including blank saves. History retains 12 prior revisions. Blank saves advance the revision and retain history so a stale client cannot restore older text. Existing legacy tombstones remain readable. No reset-all route.

The frontend always uses the public Worker endpoint; saving never depends on a missing global configuration variable. Unsaved input remains a per-country local draft, while saved notes (including blank text) synchronize across browsers via the server. A saved note never triggers website edits. Website edits require a separate user instruction.

Initial deployment 2026-10-06, version 823300f0-c012-49d8-aebd-0f38787c0743. Country tabs and collapsed upload history added 2026-10-12. The deletion feature was subsequently removed at user request. Only save/edit remain. Once explicitly instructed website corrections are applied and verified, clear only the completed memo text and save it; do not clear pending requests. Frontend canonical source: lovart-out/2026-09-21_sheet-navigator/confirmation-notes.js and .css (workspace). Published inline in worktree/index.html. Current deployment and QA receipt: output/2026-10-12_worktree-no-delete/ (workspace).

Do not rerun the initial migration under a different name. Existing 193 homepage checkbox cells were verified unchanged. Full QA: output/2026-10-06_volnewmer-worktree/.
