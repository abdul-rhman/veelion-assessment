"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { initRequests } from "@/lib/initRequests";
import { fetchReportsSummary } from "@/store/reportsSlice";

export function useReports() {
  const dispatch = useDispatch<AppDispatch>();
  const summary = useSelector((state: RootState) => state.reports.summary);
  const status = useSelector((state: RootState) => state.reports.status);
  const error = useSelector((state: RootState) => state.reports.error);

  useEffect(() => {
    initRequests();
  }, []);

  return {
    summary,
    loading: status === "idle" || status === "loading",
    error,
    fetchSummary: () => dispatch(fetchReportsSummary()),
  };
}
