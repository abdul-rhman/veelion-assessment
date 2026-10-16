import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getActivity } from "@/lib/api";
import type { ActivityLog } from "@/types/api";

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
        state.items = action.payload;
      })
      .addCase(fetchActivity.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message ?? "Could not load activity right now.";
      });
  },
});

export default activitySlice.reducer;
