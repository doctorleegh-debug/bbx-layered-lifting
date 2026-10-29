# Homepage checkbox synchronization

`worktree/index.html` keeps the existing public dashboard URL. This Worker synchronizes homepage/video country checks and newly added collaboration records. Existing staff notes use the separate confirmation-notes Worker. Legacy local node metadata stays intact; new records from **+ 협업 추가** are shared.

- SQLite Durable Object `SharedChecks`, instance `homepage-v1`, strongly consistent transactions.
- `board`: per-cell value, revision, source and timestamp; global monotonically increasing version.
- `history`: last 1,000 cell changes, kept for recovery; not returned by the public API.
- Four-second polling while visible, refresh on focus/online; explicit network failure status.
- Compare-and-swap revisions reject stale changes. Check/uncheck/undo use the same path.
- One-time legacy browser import compares against the verified pre-shared baseline. It only imports differing boolean values into cells that have not yet been edited. Explicit shared changes win. Original browser state is backed up in `beautyblossom.sheet-navigator.v1.before-shared-v1`.
- New `GET/POST /v1/tasks` records store title, category, type, source URL, handoff text, selected countries and their check status. The worktree is an existing publicly accessible, link-editable board; this is **not** an authenticated staff portal. Origin and client-header checks protect against cross-site browser writes but are not user authentication. Do not enter passwords or confidential personal data.
- Strict key/value/body size validation, same-cell conflict protection, atomic batch changes, and no public reset or delete route.

## Shared collaboration records (2026-10-30)

`tasks.js` uses the separate `SharedTasks` SQLite Durable Object (`TASKS`, instance `collaboration-v1`, additive migration v2). Its keys are `task:<CUSTOM-UUID>`, `task-history:<id>` (12 revisions), and `tasks-version`. Existing `SharedChecks` namespace, instance, board and history are untouched. CAS `rev` rejects stale editors; `requestId` makes retries idempotent. Records start pending; language-review completion requires every selected country checked. A targeted `deleted` tombstone preserves history (no bulk reset or delete route). Request limit 16KB; 2,000 record ceiling including tombstones. Polling every five seconds while visible and on focus/online. Form drafts remain in the current tab across reloads. Network/conflict failures keep input.

Authoring `workspace.js` and `workspace.css` are embedded in the published single HTML. Sidebar categories are video, website, and other. Dashboard status uses existing completion rules; “확인 필요” means incomplete with at least 14 days since the latest saved request/check/note record. It is an activity indicator, not a deadline. Existing resources, check keys, notes, links, and archive controls are reused. Preserve the six small integration hooks when repackaging.

Source authoring files remain in the existing `2026-09-21_sheet-navigator` directory. Do not rerun its old package.py: that can remove newer inline components. Update its app.js/seed.js/navigator.html and the published index.html together.

Local testing: `npx --yes wrangler@4.144.0 dev --env test --port 8877 --local` (origin http://127.0.0.1:8876). Production: same Wrangler version, `deploy --dry-run`, then `deploy`. Never reset durable storage on a code release. Local test state is isolated from production.
