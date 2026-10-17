"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useActivity } from "@/hooks/useActivity";
import type { ActivityLog } from "@/types/api";
import { ActivitySearch } from "@/components/activity/ActivitySearch";
import { ActivityList } from "@/components/activity/ActivityList";
import { ActivityFormModal } from "@/components/activity/ActivityFormModal";
import { PageHeader } from "@/components/shared/PageHeader";
import { ErrorBanner } from "@/components/shared/ErrorBanner";

export function ActivityFeed() {
  const {
    filteredActivity,
    query,
    loading,
    error,
    setQuery,
    fetchActivity,
  } = useActivity();

  const [formOpen, setFormOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<ActivityLog | null>(
    null,
  );

  const openAddForm = () => {
    setEditingActivity(null);
    setFormOpen(true);
  };

  const openEditForm = (activity: ActivityLog) => {
    setEditingActivity(activity);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  return (
    <section className="stack">
      <PageHeader
        title="The Log"
        subtitle="Every move on the board, newest first."
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-md">
          <ActivitySearch value={query} onChange={setQuery} />
        </div>

        <button
          type="button"
          className="button primary shrink-0"
          onClick={openAddForm}
        >
          <FaPlus aria-hidden className="size-3" />
          Add entry
        </button>
      </div>

      {loading ? (
        <section className="card p-4" aria-busy="true">
          <p className="m-0 animate-pulse font-hand text-xl text-muted-ink">
            Opening the log...
          </p>
        </section>
      ) : null}

      {error && !loading ? (
        <ErrorBanner message={error} onRetry={fetchActivity} />
      ) : null}

      {!loading && !error ? (
        <ActivityList activity={filteredActivity} onEdit={openEditForm} />
      ) : null}

      {formOpen ? (
        <ActivityFormModal
          activity={editingActivity ?? undefined}
          onClose={closeForm}
        />
      ) : null}
    </section>
  );
}
