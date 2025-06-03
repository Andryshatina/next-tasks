import type { Task } from "../types/task";
import { useState } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    setTasks([newTask, ...tasks]);
  };

  return (
    <div className="div">
      <TaskForm onAddTask={handleAddTask} />
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
