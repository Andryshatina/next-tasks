import { useState } from "react";
import type { Task } from "../types/task";
import TaskFormModal from "./TaskFormModal";

const TaskForm = ({
  onAddTask,
}: {
  onAddTask: (task: Omit<Task, "id" | "createdAt" | "userId">) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (title: string, description: string) => {
    if (!title.trim()) return;
    onAddTask({
      title: title.trim(),
      description: description.trim() || "",
      done: false,
    });

    setIsOpen(false);
  };

  return (
    <>
      <div className="mb-8">
        <button
          onClick={() => setIsOpen(true)}
          className="group w-full rounded-3xl border-2 border-dashed border-neutral-300 bg-white p-8 transition-all duration-200 hover:border-orange-500/50 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-900 dark:hover:bg-neutral-800/50"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 transition-transform duration-200 group-hover:scale-110">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold text-neutral-900 transition-colors duration-200 group-hover:text-orange-400 dark:text-neutral-100">
                Add New Task
              </h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                Click to create a new task
              </p>
            </div>
          </div>
        </button>
      </div>

      {isOpen && (
        <TaskFormModal
          onClose={() => setIsOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default TaskForm;
