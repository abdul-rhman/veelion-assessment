import { FaInbox } from "react-icons/fa";
import type { Task } from "@/types/api";
import { TaskItem } from "@/components/tasks/TaskItem";
import { EmptyState } from "@/components/shared/EmptyState";

type TaskListProps = {
  tasks: Task[];
  updatingTaskId: string;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
};

export function TaskList({ tasks, updatingTaskId, onToggle, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        variant="plain"
        icon={FaInbox}
        title="Nothing here yet"
        hint="No tasks under this note right now."
      />
    );
  }

  return (
    <ul className="m-0 list-none p-0">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          busy={updatingTaskId === task.id}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
