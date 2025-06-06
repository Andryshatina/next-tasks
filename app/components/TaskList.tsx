import type { Task } from "../types/task";
import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { addTask, getTasksForUser } from "../lib/firebaseTasks";
import { useSession } from "next-auth/react";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchTasks = async () => {
      if (session?.user.id) {
        const userTasks = await getTasksForUser(session?.user.id);
        setTasks(userTasks);
        console.log(userTasks);
      }
    };
    fetchTasks();
  }, [session?.user.id]);

  const handleAddTask = (
    taskData: Omit<Task, "id" | "createdAt" | "userId">
  ) => {
    if (session?.user) {
      addTask({
        ...taskData,
        createdAt: Date.now(),
        userId: session?.user.id,
      });
    }
  };

  return (
    <div className="div">
      <TaskForm onAddTask={handleAddTask} />
      {tasks.map((task) => (
        <TaskItem key={task.title} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
