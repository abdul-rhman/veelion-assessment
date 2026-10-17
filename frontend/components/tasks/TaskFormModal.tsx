"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useTasks } from "@/hooks/useTasks";
import { Modal } from "@/components/shared/Modal";
import { getErrorMessage } from "@/lib/apiClient";
import type { Task } from "@/types/api";

type TaskFormModalProps = {
  task?: Task;
  onClose: () => void;
};

export function TaskFormModal({ task, onClose }: TaskFormModalProps) {
  const { addTask, updateTaskTitle } = useTasks();
  const [title, setTitle] = useState(task?.title ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const trimmedTitle = title.trim();
  const isEdit = Boolean(task);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!trimmedTitle || saving) {
      return;
    }

    setSaving(true);
    setError("");

    try {
      if (task) {
        await updateTaskTitle(task.id, trimmedTitle);
      } else {
        await addTask(trimmedTitle);
      }
      onClose();
    } catch (submitError) {
      setError(getErrorMessage(submitError, "Could not save the task."));
      setSaving(false);
    }
  };

  return (
    <Modal title={isEdit ? "Edit task" : "New task"} onClose={onClose}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 text-sm font-medium text-ink">
          Task
          <input
            autoFocus
            required
            maxLength={120}
            className="input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="What needs doing?"
          />
        </label>

        {error ? <p className="m-0 text-sm text-danger">{error}</p> : null}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="button"
            disabled={saving}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="button primary"
            disabled={saving || !trimmedTitle}
          >
            {saving ? "Saving..." : isEdit ? "Save task" : "Add task"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
