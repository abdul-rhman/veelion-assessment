export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ActivityLog = {
  id: string;
  action?: string;
  info?: string;
  when: string;
};

export type TasksSummary = {
  total: number;
  byStatus: {
    todo: number;
    "in-progress": number;
    done: number;
  };
  recentActivityCount: number;
};

export type TasksResponse = {
  data: Task[];
};

export type TaskResponse = {
  data: Task;
};

export type ActivitiesResponse = {
  data: ActivityLog[];
};

export type ActivityResponse = {
  data: ActivityLog;
};

export type ErrorResponse = {
  error?: {
    message?: string;
  };
};

export type TaskFilter = "all" | "completed" | "pending";

export type TaskUpdates = {
  title?: string;
  completed?: boolean;
};

export type ActivityInput = {
  action: string;
  info?: string;
};

export type ActivityUpdates = {
  action?: string;
  info?: string;
};
