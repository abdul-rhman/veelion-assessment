import { store } from "@/store";
import { fetchTasks } from "@/store/tasksSlice";
import { fetchActivity } from "@/store/activitySlice";
import { fetchReportsSummary } from "@/store/reportsSlice";

export function initRequests() {
  const { tasks, activity, reports } = store.getState();

  if (tasks.status === "idle" || tasks.status === "failed") {
    store.dispatch(fetchTasks());
  }

  if (activity.status === "idle" || activity.status === "failed") {
    store.dispatch(fetchActivity());
  }

  if (reports.status === "idle" || reports.status === "failed") {
    store.dispatch(fetchReportsSummary());
  }
}
