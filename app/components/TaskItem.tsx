import type { Task } from "../types/task";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string, curStatus: boolean) => void;
  onDelete: (id: string) => void;
};

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const { id, title, description, done } = task;

  const handleEdit = () => {
    //Implement edit functionality
    console.log("Edit task:", id);
  };

  return (
    <div
      className={`group rounded-2xl border bg-white p-6 transition-all duration-200
  hover:border-neutral-300 dark:border-neutral-700/50 dark:bg-neutral-900 
  dark:hover:border-neutral-600 ${done ? "opacity-70" : ""}`}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(id, done)}
          className={`mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 
          ${
            done
              ? "border-orange-500 bg-orange-500 text-white"
              : "border-neutral-400 hover:border-orange-400 hover:bg-orange-500/10 dark:border-neutral-500"
          }`}
        >
          {done && (
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <h3
            className={`text-lg font-medium transition-all duration-200 
            ${
              done
                ? "text-neutral-400 line-through dark:text-neutral-500"
                : "text-neutral-900 dark:text-neutral-100"
            }`}
          >
            {title}
          </h3>

          {description && (
            <p
              className={`mt-2 text-sm transition-all duration-200 
              ${
                done
                  ? "text-neutral-500 line-through dark:text-neutral-600"
                  : "text-neutral-600 dark:text-neutral-400"
              }`}
            >
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 transition-opacity duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100">
          <button
            onClick={handleEdit}
            className="rounded-xl p-2 transition-colors duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            title="Edit task"
          >
            <svg
              className="h-4 w-4 text-neutral-600 hover:text-orange-400 dark:text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          <button
            onClick={() => onDelete(id)}
            className="rounded-xl p-2 transition-colors duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            title="Delete task"
          >
            <svg
              className="h-4 w-4 text-neutral-600 hover:text-red-400 dark:text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
