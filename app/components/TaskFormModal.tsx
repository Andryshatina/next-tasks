import { useEffect, useState } from "react";

type TaskFormModalProps = {
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
  initialTitle?: string;
  initialDescription?: string;
};

const TaskFormModal = ({
  onClose,
  onSubmit,
  initialTitle,
  initialDescription,
}: TaskFormModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialTitle) {
      setTitle(initialTitle);
      setDescription(initialDescription || "");
    }
  }, [initialTitle, initialDescription]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description);
    setTitle("");
    setDescription("");
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 dark:bg-black/50">
      <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-8 shadow-2xl dark:border-neutral-700/50 dark:bg-neutral-900">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Task
          </h2>
          <button
            onClick={onClose}
            className="rounded-xl p-2 transition-colors duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <svg
              className="h-5 w-5 text-neutral-600 dark:text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-5 py-4 text-neutral-900 placeholder-neutral-500 outline-none transition-all duration-200 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/40 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-400"
            autoFocus
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            rows={3}
            className="w-full resize-none rounded-2xl border border-neutral-300 bg-neutral-50 px-5 py-4 text-neutral-900 placeholder-neutral-500 outline-none transition-all duration-200 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/40 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-400"
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl bg-neutral-200 px-6 py-4 font-medium text-neutral-700 transition-all duration-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-2xl bg-orange-500 px-6 py-4 font-medium text-white transition-all duration-200 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/25 active:scale-[0.98]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;
