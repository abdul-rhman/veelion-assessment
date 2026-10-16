"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { initRequests } from "@/lib/initRequests";
import { fetchActivity } from "@/store/activitySlice";

export function useActivity() {
  const dispatch = useDispatch<AppDispatch>();
  const activity = useSelector((state: RootState) => state.activity.items);
  const status = useSelector((state: RootState) => state.activity.status);
  const error = useSelector((state: RootState) => state.activity.error);

  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    initRequests();
  }, []);

  const filteredActivity = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return activity;
    }

    return activity.filter(
      (item) =>
        (item.action || "").toLowerCase().includes(search) ||
        (item.info || "").toLowerCase().includes(search),
    );
  }, [activity, query]);

  return {
    activity,
    filteredActivity,
    query,
    loading: status === "idle" || status === "loading",
    error,
    setQuery,
    fetchActivity: () => dispatch(fetchActivity()),
  };
}
