import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getReportsSummary } from "@/lib/api";
import type { TasksSummary } from "@/types/api";

export type ReportsState = {
  summary: TasksSummary | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
};

const initialState: ReportsState = {
  summary: null,
  status: "idle",
  error: "",
};

export const fetchReportsSummary = createAsyncThunk<TasksSummary>(
  "reports/fetchSummary",
  async () => {
    return getReportsSummary();
  },
);

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportsSummary.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchReportsSummary.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.summary = action.payload;
      })
      .addCase(fetchReportsSummary.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message ?? "Could not load report summary right now.";
      });
  },
});

export default reportsSlice.reducer;
