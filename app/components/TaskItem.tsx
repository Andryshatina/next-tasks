import type { Task } from "../types/task";

const TaskItem = ({ task }: { task: Task }) => {
  const { title, description } = task;
  return (
    <div>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
};

export default TaskItem;
