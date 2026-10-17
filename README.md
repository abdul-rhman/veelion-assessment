# Tackboard

Tackboard is my submission for the VeeLion full-stack assessment. The starter gave
us an Express API over two JSON files and a bare Next.js front end; this version
keeps that skeleton, fixes what my code review turned up, adds the Reports module,
and wraps it all in a notebook-style UI — a pinned ledger for tasks, a running log
for activity, and a quiet little page for the numbers.

- `backend/` — the API: Express, no database, two JSON files. Tasks, Activity and
  the new Reports module. Runs on `http://localhost:3000`.
- `frontend/` — the UI: Next.js 14 (App Router), TypeScript, Redux Toolkit. Talks
  to the API through its own `/api/*` proxy routes.
- `REVIEW.md` — the code review: everything I found in the starter and how I fixed
  it. That file is the interesting one if you want the story behind the code.
- `LIMITATIONS.md` — the review points that are not fixed yet, each with an idea
  for how to improve it.

## Running it

Two terminals, backend first.

**1. Backend (port 3000)**

```bash
cd backend
npm install
npm start        # npm run dev for node --watch
```

**2. Frontend (port 3001)**

```bash
cd frontend
cp .env.example .env.local     # Windows: copy .env.example .env.local
npm install
npm run dev
```

Two things worth knowing:

- The frontend reads the API URL from `NEXT_PUBLIC_BACKEND_API_URL`. The example
  file already points at `http://localhost:3000`, which is where the API lives. If
  you build for production instead (`npm run build && npm start`), pass a port
  explicitly, because `next start` won't auto-pick one: `npm start -- -p 3001`.
- The dev server uses 3001 because the backend already owns 3000.

## What you can do in the app

- **Tasks (the ledger)** — check tasks off, add new ones, rename them with the
  pencil button, and filter by status. The add row at the bottom of the sheet is
  always there, like the next line of a notebook.
- **Activity (the log)** — search across entries, add a new entry, edit existing
  ones. Entries are always listed newest first.
- **Reports (the numbers)** — total tasks, a breakdown by status, and how much
  activity there's been in the last 7 days. The numbers refresh themselves after
  any change you make on the other pages.

## The API at a glance

Both modules share the same five routes:

| Method | Tasks        | Activity        |
| ------ | ------------ | --------------- |
| GET    | `/tasks`     | `/activity`     |
| GET    | `/tasks/:id` | `/activity/:id` |
| POST   | `/tasks`     | `/activity`     |
| PATCH  | `/tasks/:id` | `/activity/:id` |
| DELETE | `/tasks/:id` | `/activity/:id` |

Responses are wrapped as `{ "data": ... }`; errors as
`{ "error": { "message": "..." } }` with status 400 (validation) or 404 (missing
id). Unknown fields in a request body are rejected rather than stored.

The Reports endpoint returns its summary raw (no wrapper):

```json
{
  "total": 20,
  "byStatus": { "todo": 5, "in-progress": 10, "done": 5 },
  "recentActivityCount": 12
}
```

Two details baked into that shape: `byStatus["in-progress"]` is always `0` because
a task is just done or not done in this data model, and `recentActivityCount`
counts entries from the last 7 days. The full reference lives in
[`frontend/docs/backend-endpoints.md`](./frontend/docs/backend-endpoints.md).

## How the frontend reaches the API

The browser only ever calls its own origin:

```
Browser → /api/* (Next route handlers) → Express API on :3000
```

The route handlers in `app/api/` are thin proxies. That keeps CORS out of the
picture, keeps the backend URL on the server side, and gives one place to shape
error messages. Writes go through Redux thunks (`addTask`, `updateTaskTitle`,
`addActivity`, `updateActivity`), which update the store and refresh the Reports
summary in the same breath.

## Scripts

| Where    | Command                | What                        |
| -------- | ---------------------- | --------------------------- |
| backend  | `npm start`            | run the API                 |
| backend  | `npm run dev`          | run it with `node --watch`  |
| frontend | `npm run dev`          | dev server                  |
| frontend | `npm run build`        | production build            |
| frontend | `npm start`            | production preview          |
| frontend | `npm run format`       | run Prettier                |
| frontend | `npm run format:check` | check formatting            |

## About the data

Storage is two JSON files under `backend/data/`. There's no database and no auth —
it's a local assessment project, so treat the server as the only writer. That said,
if you want to edit the JSON by hand, stop the server first; it reads the files on
every request and won't know about changes made underneath it mid-write.
