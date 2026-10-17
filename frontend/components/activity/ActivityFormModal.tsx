"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useActivity } from "@/hooks/useActivity";
import { Modal } from "@/components/shared/Modal";
import { getErrorMessage } from "@/lib/apiClient";
import type { ActivityInput, ActivityLog } from "@/types/api";

type ActivityFormModalProps = {
  activity?: ActivityLog;
  onClose: () => void;
};

export function ActivityFormModal({
  activity,
  onClose,
}: ActivityFormModalProps) {
  const { addActivity, updateActivity } = useActivity();
  const [action, setAction] = useState(activity?.action ?? "");
  const [info, setInfo] = useState(activity?.info ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const trimmedAction = action.trim();
  const trimmedInfo = info.trim();
  const isEdit = Boolean(activity);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!trimmedAction || saving) {
      return;
    }

    setSaving(true);
    setError("");

    const input: ActivityInput = trimmedInfo
      ? { action: trimmedAction, info: trimmedInfo }
      : { action: trimmedAction };

    try {
      if (activity) {
        await updateActivity(activity.id, input);
      } else {
        await addActivity(input);
      }
      onClose();
    } catch (submitError) {
      setError(getErrorMessage(submitError, "Could not save the entry."));
      setSaving(false);
    }
  };

  return (
    <Modal title={isEdit ? "Edit entry" : "New entry"} onClose={onClose}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 text-sm font-medium text-ink">
          What happened
          <input
            autoFocus
            required
            maxLength={120}
            className="input"
            value={action}
            onChange={(event) => setAction(event.target.value)}
            placeholder="Moved a task, cleaned the board..."
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-ink">
          Details
          <input
            maxLength={200}
            className="input"
            value={info}
            onChange={(event) => setInfo(event.target.value)}
            placeholder="Optional"
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
            disabled={saving || !trimmedAction}
          >
            {saving ? "Saving..." : isEdit ? "Save entry" : "Add entry"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
