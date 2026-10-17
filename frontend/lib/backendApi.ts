import { BACKEND_BASE_URL } from "@/lib/constants";
import type {
  ActivitiesResponse,
  ActivityInput,
  ActivityLog,
  ActivityResponse,
  ActivityUpdates,
  ErrorResponse,
  Task,
  TaskResponse,
  TasksResponse,
  TasksSummary,
  TaskUpdates,
} from "@/types/api";

function buildBackendUrl(path: string): string {
  return `${BACKEND_BASE_URL}${path}`;
}

async function parseError(response: Response): Promise<string> {
  let fallback = `Request failed with status ${response.status}`;

  try {
    const body = (await response.json()) as ErrorResponse;
    return body.error?.message || fallback;
  } catch {
    return fallback;
  }
}

export async function getTasksFromBackend(): Promise<Task[]> {
  try {
    const response = await fetch(buildBackendUrl("/tasks"), {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    const body = (await response.json()) as TasksResponse;
    return body.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to load tasks.");
  }
}

export async function createTaskInBackend(title: string): Promise<Task> {
  try {
    const response = await fetch(buildBackendUrl("/tasks"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    const body = (await response.json()) as TaskResponse;
    return body.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to create task.");
  }
}

export async function updateTaskInBackend(taskId: string, updates: TaskUpdates): Promise<Task> {
  try {
    const response = await fetch(buildBackendUrl(`/tasks/${taskId}`), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    const body = (await response.json()) as TaskResponse;
    return body.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to update task.");
  }
}

export async function getActivityFromBackend(): Promise<ActivityLog[]> {
  try {
    const response = await fetch(buildBackendUrl("/activity"), {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    const body = (await response.json()) as ActivitiesResponse;
    return body.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to load activity logs.");
  }
}

export async function createActivityInBackend(input: ActivityInput): Promise<ActivityLog> {
  try {
    const response = await fetch(buildBackendUrl("/activity"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    const body = (await response.json()) as ActivityResponse;
    return body.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to create activity log.");
  }
}

export async function updateActivityInBackend(
  activityId: string,
  updates: ActivityUpdates,
): Promise<ActivityLog> {
  try {
    const response = await fetch(buildBackendUrl(`/activity/${activityId}`), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    const body = (await response.json()) as ActivityResponse;
    return body.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to update activity log.");
  }
}

export async function getTasksSummaryFromBackend(): Promise<TasksSummary> {
  try {
    const response = await fetch(buildBackendUrl("/reports/tasks-summary"), {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    return (await response.json()) as TasksSummary;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to load tasks summary."
    );
  }
}
