"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getErrorMessage, requestJson } from "@/lib/apiClient";
import type { ActivityLog } from "@/types/api";

export function useActivity() {
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchActivity = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const logs = await requestJson<ActivityLog[]>("/api/activity", {
        method: "GET",
      });

      setActivity(logs ?? []);
    } catch (error) {
      setError(getErrorMessage(error, "Could not load activity right now."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  const filteredActivity = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return activity;
    }

    return activity.filter(
      (item) =>
        (item.action || "").toLowerCase().includes(search) ||
        (item.info || "").toLowerCase().includes(search)
    );
  }, [activity, query]);

  return {
    activity,
    filteredActivity,
    query,
    loading,
    error,
    setQuery,
    fetchActivity,
  };
}
