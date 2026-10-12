# Confirmation notes

Shared correction notes for worktree confirmation and country-specific language review. This store is independent of the existing homepage checkbox Worker.

Public-link editing, not an authenticated staff portal. CORS restricts browser callers to the shared GitHub Pages origin; it is not authentication. Do not put patient data or credentials in notes.

Worker: bb-worktree-confirmation-notes. SQLite Durable Object: ConfirmationNotes / confirmation-v1. GET, POST and DELETE /v1/notes use X-BB-Worktree: notes-v1. The existing object identity and migration remain unchanged.

POST requires id, text, author, rev, requestId. DELETE requires id, rev, requestId and application/json. Existing IDs (R07, BASE01, CUSTOM-UUID) retain their original notes. A country suffix (R07/EN, R07/JP, CN, TW, TH, HK) stores a separate note. Revision conflict returns 409; the UI retains the local draft. Matching requestId retries are idempotent for both save and delete. History retains 12 prior revisions. Delete clears the active text and records a versioned tombstone so an older browser cannot resurrect a deleted note. No reset-all route.

The frontend always uses the public Worker endpoint; saving never depends on a missing global configuration variable. Unsaved input remains a per-country local draft, while saved notes and deletions synchronize across browsers via the server. A saved note never triggers website edits. Website edits require a separate user instruction.

Initial deployment 2026-10-06, version 823300f0-c012-49d8-aebd-0f38787c0743. Country tabs, server deletion, and collapsed upload history added 2026-10-12. Frontend canonical source: lovart-out/2026-09-21_sheet-navigator/confirmation-notes.js and .css (workspace). Published inline in worktree/index.html. Current deployment and QA receipt: output/2026-10-12_worktree-country-notes/ (workspace).

Do not rerun the initial migration under a different name. Existing 193 homepage checkbox cells were verified unchanged. Full QA: output/2026-10-06_volnewmer-worktree/.
