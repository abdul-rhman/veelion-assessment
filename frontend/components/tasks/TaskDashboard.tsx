"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/types/api";
import { StatusFilter } from "@/components/tasks/StatusFilter";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskFormModal } from "@/components/tasks/TaskFormModal";
import { LedgerSkeleton } from "@/components/tasks/LedgerSkeleton";
import { PageHeader } from "@/components/shared/PageHeader";
import { ErrorBanner } from "@/components/shared/ErrorBanner";

export function TaskDashboard() {
  const {
    tasks,
    filteredTasks,
    filter,
    loading,
    error,
    updatingTaskId,
    setFilter,
    fetchTasks,
    updateTaskStatus,
  } = useTasks();

  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const openAddForm = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  const openEditForm = (task: Task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  const handleToggle = (task: Task) => {
    updateTaskStatus(task.id, !task.completed);
  };

  const counts = {
    all: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    pending: tasks.filter((task) => !task.completed).length,
  };

  return (
    <section className="stack">
      <PageHeader
        title="To Do"
        subtitle="Everything you owe the week, written down line by line."
      />

      {error ? <ErrorBanner message={error} onRetry={fetchTasks} /> : null}

      {!error ? (
        <div className="flex flex-col gap-4 lg:flex-row-reverse lg:items-start lg:gap-6">
          <StatusFilter
            value={filter}
            onChange={setFilter}
            counts={counts}
          />

          <div
            className="card relative min-w-0 flex-1 overflow-hidden"
            id="ledger"
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-16 w-px bg-secondary/70"
            />

            <div className="flex items-center justify-between gap-4 border-b border-primary/15 py-3 pr-4 pl-[7rem]">
              <span className="micro-label">Task</span>
              <span className="micro-label">Updated</span>
            </div>

            {loading ? (
              <LedgerSkeleton />
            ) : (
              <>
                <TaskList
                  tasks={filteredTasks}
                  updatingTaskId={updatingTaskId}
                  onToggle={handleToggle}
                  onEdit={openEditForm}
                />

                <button
                  type="button"
                  onClick={openAddForm}
                  className="group flex w-full items-center gap-3 border-t-2 border-dashed border-primary/30 bg-primary/5 px-4 py-4 text-left transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                >
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform group-hover:scale-110 motion-reduce:transition-none">
                    <FaPlus aria-hidden className="size-3" />
                  </span>
                  <span aria-hidden="true" className="ml-4 w-7 shrink-0" />
                  <span className="font-hand text-xl leading-none text-primary">
                    Add a task
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}

      {formOpen ? (
        <TaskFormModal task={editingTask ?? undefined} onClose={closeForm} />
      ) : null}
    </section>
  );
}
