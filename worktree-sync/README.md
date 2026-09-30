# Homepage checkbox synchronization

`worktree/index.html` keeps the existing public dashboard URL. Only homepage country review/upload flags use this Worker. Notes, manual links, custom node metadata and card-news completion are still browser-local and are not sent to the Worker.

- SQLite Durable Object `SharedChecks`, instance `homepage-v1`, strongly consistent transactions.
- `board`: per-cell value, revision, source and timestamp; global monotonically increasing version.
- `history`: last 1,000 cell changes, kept for recovery; not returned by the public API.
- Four-second polling while visible, refresh on focus/online; explicit network failure status.
- Compare-and-swap revisions reject stale changes. Check/uncheck/undo use the same path.
- One-time legacy browser import compares against the verified pre-shared baseline. It only imports differing boolean values into cells that have not yet been edited. Explicit shared changes win. Original browser state is backed up in `beautyblossom.sheet-navigator.v1.before-shared-v1`.
- Backend stores no passwords, staff notes, account identities or arbitrary links. The worktree is an existing publicly accessible, link-editable board; this is **not** an authenticated staff portal. Origin and client-header checks protect against cross-site browser writes but are not user authentication.
- Strict key/value/body size validation, same-cell conflict protection, atomic batch changes, and no public reset or delete route.

Source authoring files remain in the existing `2026-09-21_sheet-navigator` directory. Do not rerun its old package.py: that can remove newer inline components. Update its app.js/seed.js/navigator.html and the published index.html together.

Local testing: `npx --yes wrangler@4.144.0 dev --env test --port 8877 --local` (origin http://127.0.0.1:8876). Production: same Wrangler version, `deploy --dry-run`, then `deploy`. Never reset durable storage on a code release. Local test state is isolated from production.
