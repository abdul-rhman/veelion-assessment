import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTask, getTasks, patchTask } from "@/lib/api";
import { fetchReportsSummary } from "@/store/reportsSlice";
import type { Task } from "@/types/api";

export type TasksState = {
  items: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
  updatingTaskId: string;
};

const initialState: TasksState = {
  items: [],
  status: "idle",
  error: "",
  updatingTaskId: "",
};

export const fetchTasks = createAsyncThunk<Task[]>("tasks/fetch", async () => {
  return getTasks();
});

export const updateTaskStatus = createAsyncThunk<
  Task,
  { taskId: string; completed: boolean }
>("tasks/updateStatus", async ({ taskId, completed }, { dispatch }) => {
  const task = await patchTask(taskId, { completed });

  dispatch(fetchReportsSummary());

  return task;
});

export const addTask = createAsyncThunk<Task, string>(
  "tasks/add",
  async (title, { dispatch }) => {
    const task = await createTask(title);

    dispatch(fetchReportsSummary());

    return task;
  },
);

export const updateTaskTitle = createAsyncThunk<
  Task,
  { taskId: string; title: string }
>("tasks/updateTitle", async ({ taskId, title }) => {
  return patchTask(taskId, { title });
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Could not load tasks right now.";
      })
      .addCase(updateTaskStatus.pending, (state, action) => {
        state.updatingTaskId = action.meta.arg.taskId;
        state.error = "";
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        state.updatingTaskId = "";
        state.items = state.items.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        );
      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        state.updatingTaskId = "";
        state.error = action.error.message ?? "Could not update task status.";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload];
      })
      .addCase(updateTaskTitle.fulfilled, (state, action) => {
        state.items = state.items.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        );
      });
  },
});

export default tasksSlice.reducer;
