"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import type { TaskFilter } from "@/types/api";
import { initRequests } from "@/lib/initRequests";
import { addTask, fetchTasks, updateTaskStatus, updateTaskTitle } from "@/store/tasksSlice";

export function useTasks() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const status = useSelector((state: RootState) => state.tasks.status);
  const error = useSelector((state: RootState) => state.tasks.error);
  const updatingTaskId = useSelector(
    (state: RootState) => state.tasks.updatingTaskId,
  );

  const [filter, setFilter] = useState<TaskFilter>("all");

  useEffect(() => {
    initRequests();
  }, []);

  const filteredTasks = useMemo(() => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }

    if (filter === "pending") {
      return tasks.filter((task) => !task.completed);
    }

    return tasks;
  }, [tasks, filter]);

  return {
    tasks,
    filteredTasks,
    filter,
    loading: status === "idle" || status === "loading",
    error,
    updatingTaskId,
    setFilter,
    fetchTasks: () => dispatch(fetchTasks()),
    updateTaskStatus: (taskId: string, completed: boolean) =>
      dispatch(updateTaskStatus({ taskId, completed })),
    addTask: (title: string) => dispatch(addTask(title)).unwrap(),
    updateTaskTitle: (taskId: string, title: string) =>
      dispatch(updateTaskTitle({ taskId, title })).unwrap(),
  };
}
