import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createActivity, getActivity, patchActivity } from "@/lib/api";
import { fetchReportsSummary } from "@/store/reportsSlice";
import type { ActivityInput, ActivityLog } from "@/types/api";

export type ActivityState = {
  items: ActivityLog[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
};

const initialState: ActivityState = {
  items: [],
  status: "idle",
  error: "",
};

export const fetchActivity = createAsyncThunk<ActivityLog[]>(
  "activity/fetch",
  async () => {
    return getActivity();
  },
);

export const addActivity = createAsyncThunk<ActivityLog, ActivityInput>(
  "activity/add",
  async (input, { dispatch }) => {
    const activity = await createActivity(input);

    dispatch(fetchReportsSummary());

    return activity;
  },
);

export const updateActivity = createAsyncThunk<
  ActivityLog,
  { activityId: string; input: ActivityInput }
>("activity/update", async ({ activityId, input }) => {
  return patchActivity(activityId, input);
});

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivity.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchActivity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = [...action.payload].sort(
          (a, b) => new Date(b.when).getTime() - new Date(a.when).getTime(),
        );
      })
      .addCase(fetchActivity.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message ?? "Could not load activity right now.";
      })
      .addCase(addActivity.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        );
      });
  },
});

export default activitySlice.reducer;
