import type { Task } from "../types/task";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { addTask, getTasksForUser, toggleTask } from "../lib/firebaseTasks";
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

  const handleToggle = async (TaskId: string, currStatus: boolean) => {
    if (!session?.user) return;

    await toggleTask(TaskId, currStatus);
    queryClient.invalidateQueries({ queryKey: ["tasks", session.user.id] });
  };

  return (
    <div className="div">
      <TaskForm onAddTask={handleAddTask} />
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={handleToggle} />
      ))}
    </div>
  );
};

export default TaskList;
