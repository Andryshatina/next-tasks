import type { Task } from "../types/task";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string, curStatus: boolean) => void;
};

const TaskItem = ({ task, onToggle }: TaskItemProps) => {
  const { id, title, description, done } = task;
  return (
    <div className="p-2 m-2 border-2 border-amber-300">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      <button
        onClick={() => onToggle?.(id, done)}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          done
            ? "bg-green-500 border-green-500 text-white"
            : "border-gray-300 hover:border-green-400 hover:bg-green-50"
        }`}
      ></button>
    </div>
  );
};

export default TaskItem;
