# Backend API Endpoints

Base URL: `http://localhost:4000`

## Shared Error Shape

```ts
type ErrorResponse = {
  error: {
    message: string;
  };
};
```

## Task Endpoints

### GET /tasks

Fetch all tasks.

```ts
type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
};

type GetTasksResponse = {
  data: Task[];
};
```

### GET /tasks/:id

Fetch one task by ID.

```ts
type GetTaskResponse = {
  data: Task;
};
```

Possible errors:
- `404` when task does not exist.

### POST /tasks

Create a task.

```ts
type CreateTaskRequest = {
  title: string; // required, trimmed, non-empty
  completed?: boolean; // default false
};

type CreateTaskResponse = {
  data: Task;
};
```

Possible errors:
- `400` when body is not an object.
- `400` when title is missing/invalid/empty.
- `400` when completed is not a boolean.

### PATCH /tasks/:id

Update task title or status.

```ts
type PatchTaskRequest = {
  title?: string; // if provided, must be string and long enough after trim
  completed?: boolean;
};

type PatchTaskResponse = {
  data: Task;
};
```

Possible errors:
- `400` when body is invalid.
- `400` when no supported fields are provided.
- `404` when task does not exist.

### DELETE /tasks/:id

Delete task by ID.

```ts
type DeleteTaskResponse = void; // status 204
```

Possible errors:
- `404` when task does not exist.

## Activity Endpoints

### GET /activity

Fetch all activity logs in stored order.

```ts
type ActivityLog = {
  id: string;
  action: string;
  info?: string;
  when: string; // ISO datetime
};

type GetActivityResponse = {
  data: ActivityLog[];
};
```

### GET /activity/:id

Fetch one activity log by ID.

```ts
type GetActivityLogResponse = {
  data: ActivityLog;
};
```

Possible errors:
- `404` when activity log does not exist.

### POST /activity

Create an activity log entry.

```ts
type CreateActivityRequest = {
  action: string; // required, trimmed, non-empty
  info?: string; // optional, trimmed, non-empty when provided
};

type CreateActivityResponse = {
  data: ActivityLog;
};
```

Possible errors:
- `400` when body is not an object.
- `400` when action is missing/invalid/empty.
- `400` when info is not a string or empty.
- `400` when body contains unsupported fields.

### PATCH /activity/:id

Update an activity log entry.

```ts
type PatchActivityRequest = {
  action?: string; // if provided, must be string, non-empty after trim
  info?: string; // if provided, must be string, non-empty after trim
};

type PatchActivityResponse = {
  data: ActivityLog;
};
```

Possible errors:
- `400` when body is invalid.
- `400` when no supported fields are provided.
- `400` when body contains unsupported fields.
- `404` when activity log does not exist.

### DELETE /activity/:id

Delete an activity log by ID.

```ts
type DeleteActivityResponse = void; // status 204
```

Possible errors:
- `404` when activity log does not exist.

Notes:
- Activity endpoints follow the same `{ data: ... }` envelope and error handling as the tasks endpoints.
- `id` and `when` are server-managed and cannot be set or updated through the API.

## Reports Endpoints

### GET /reports/tasks-summary

Fetch summary statistics for tasks and activity.

```ts
type TasksSummary = {
  total: number;
  byStatus: {
    todo: number;
    "in-progress": number;
    done: number;
  };
  recentActivityCount: number;
};

type GetTasksSummaryResponse = TasksSummary;
```

Notes:
- `in-progress` is currently returned as `0` because task data only includes boolean `completed`.
- Response shape is raw object.

## Frontend Proxy Routes

The Next.js app exposes thin proxy routes under `/api/*` so the browser never calls the backend directly:

- `GET /api/tasks`, `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `GET /api/activity`, `POST /api/activity`
- `PATCH /api/activity/:id`
- `GET /api/reports/tasks-summary`

Requests, `{ data: ... }` envelopes, and validation errors mirror the backend routes above. Only the endpoints used by the UI are proxied (no GET-by-id or DELETE).
