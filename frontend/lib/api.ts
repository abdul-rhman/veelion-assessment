import { requestJson } from "@/lib/apiClient";
import type {
  ActivityLog,
  Task,
  TaskResponse,
  TasksResponse,
  TasksSummary,
} from "@/types/api";

export async function getTasks(): Promise<Task[]> {
  const body = await requestJson<TasksResponse>("/api/tasks", {
    method: "GET",
  });
  return body.data ?? [];
}

export async function getActivity(): Promise<ActivityLog[]> {
  const logs = await requestJson<ActivityLog[]>("/api/activity", {
    method: "GET",
  });
  return logs ?? [];
}

export async function getReportsSummary(): Promise<TasksSummary> {
  return requestJson<TasksSummary>("/api/reports/tasks-summary", {
    method: "GET",
  });
}

export async function patchTask(
  taskId: string,
  completed: boolean,
): Promise<Task> {
  const body = await requestJson<TaskResponse>(`/api/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify({ completed }),
  });
  return body.data;
}
