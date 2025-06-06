import type { Task } from "../types/task";

const TaskItem = ({ task }: { task: Task }) => {
  const { title, description } = task;
  return (
    <div className="p-2 m-2 border-2 border-amber-300">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
};

export default TaskItem;
