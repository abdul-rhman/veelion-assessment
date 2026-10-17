import { FaPen } from "react-icons/fa";
import type { Task } from "@/types/api";

const CHECK_CLASS =
  "inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md border-2 border-line-strong bg-surface text-transparent transition-colors hover:border-primary hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-60 aria-pressed:border-accent-strong aria-pressed:bg-secondary/25 aria-pressed:text-accent-strong";

type TaskItemProps = {
  task: Task;
  index: number;
  busy: boolean;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
};

export function TaskItem({ task, index, busy, onToggle, onEdit }: TaskItemProps) {
  return (
    <li className="flex items-center gap-3 border-b border-primary/15 px-4 py-4 transition-colors last:border-b-0 hover:bg-background/60">
      <button
        type="button"
        className={CHECK_CLASS}
        aria-pressed={task.completed}
        aria-label={`Mark ${task.title} as ${task.completed ? "pending" : "completed"}`}
        disabled={busy}
        onClick={() => onToggle(task)}
      >
        {task.completed ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="animate-check-pop size-4 motion-reduce:animate-none"
          >
            <path
              d="M4 13.5 L9.5 19 L20 5.5"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </button>

      <span
        aria-hidden="true"
        className="ml-4 w-7 shrink-0 font-hand text-xl leading-none text-muted-ink"
      >
        {index + 1}.
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <p
          className={`m-0 text-base font-medium text-ink ${
            task.completed
              ? "box-decoration-clone bg-linear-to-t from-secondary/80 from-42% to-transparent to-42% px-[0.15em] line-through decoration-ink/40"
              : ""
          }`}
        >
          {task.title}
        </p>

        <div className="flex shrink-0 items-baseline gap-3">
          {busy ? (
            <span className="animate-pulse font-hand text-lg leading-none text-primary">
              saving…
            </span>
          ) : null}
          <small className="text-xs text-muted-ink">
            {new Date(task.updatedAt).toLocaleString()}
          </small>
          <button
            type="button"
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
            className="inline-flex size-7 shrink-0 items-center justify-center self-center rounded-md text-muted-ink transition-colors hover:bg-surface hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <FaPen aria-hidden className="size-3" />
          </button>
        </div>
      </div>
    </li>
  );
}
