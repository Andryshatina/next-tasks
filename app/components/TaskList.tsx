import type { Task } from "../types/task";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { addTask, getTasksForUser } from "../lib/firebaseTasks";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const TaskList = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks", session?.user?.id],
    queryFn: () => getTasksForUser(session!.user.id),
    enabled: !!session?.user?.id,
  });

  const handleAddTask = async (
    taskData: Omit<Task, "id" | "createdAt" | "userId">
  ) => {
    if (!session?.user) return;
    await addTask({
      ...taskData,
      createdAt: Date.now(),
      userId: session?.user.id,
    });
    queryClient.invalidateQueries({ queryKey: ["tasks", session.user.id] });
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
