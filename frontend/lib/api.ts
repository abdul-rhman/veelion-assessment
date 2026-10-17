import { requestJson } from "@/lib/apiClient";
import type {
  ActivitiesResponse,
  ActivityInput,
  ActivityLog,
  ActivityResponse,
  ActivityUpdates,
  Task,
  TaskResponse,
  TasksResponse,
  TasksSummary,
  TaskUpdates,
} from "@/types/api";

export async function getTasks(): Promise<Task[]> {
  const body = await requestJson<TasksResponse>("/api/tasks", {
    method: "GET",
  });
  return body.data ?? [];
}

export async function createTask(title: string): Promise<Task> {
  const body = await requestJson<TaskResponse>("/api/tasks", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
  return body.data;
}

export async function patchTask(
  taskId: string,
  updates: TaskUpdates,
): Promise<Task> {
  const body = await requestJson<TaskResponse>(`/api/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
  return body.data;
}

export async function getActivity(): Promise<ActivityLog[]> {
  const body = await requestJson<ActivitiesResponse>("/api/activity", {
    method: "GET",
  });
  return body.data ?? [];
}

export async function createActivity(
  input: ActivityInput,
): Promise<ActivityLog> {
  const body = await requestJson<ActivityResponse>("/api/activity", {
    method: "POST",
    body: JSON.stringify(input),
  });
  return body.data;
}

export async function patchActivity(
  activityId: string,
  updates: ActivityUpdates,
): Promise<ActivityLog> {
  const body = await requestJson<ActivityResponse>(
    `/api/activity/${activityId}`,
    {
      method: "PATCH",
      body: JSON.stringify(updates),
    },
  );
  return body.data;
}

export async function getReportsSummary(): Promise<TasksSummary> {
  return requestJson<TasksSummary>("/api/reports/tasks-summary", {
    method: "GET",
  });
}
