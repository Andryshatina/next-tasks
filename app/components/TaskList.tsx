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

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-orange-500 dark:border-neutral-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-6 dark:bg-neutral-950">
        <div className="rounded-2xl border border-red-300 bg-red-100 p-5 text-red-700 dark:border-red-700/50 dark:bg-red-900/20 dark:text-red-300">
          Failed to load tasks. Please try again.
        </div>
      </div>
    );
  }

  const completedCount = tasks.filter((t) => t.done).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-3xl p-6">
        <TaskForm onAddTask={handleAddTask} />

        <div className="space-y-6">
          {totalCount > 0 && (
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                Your Tasks
              </h2>
              <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                <span>
                  {completedCount} of {totalCount} completed
                </span>
                <div className="h-2 w-20 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                  <div
                    className="h-full rounded-full bg-orange-500 transition-all duration-500"
                    style={{
                      width: `${
                        totalCount > 0 ? (completedCount / totalCount) * 100 : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {tasks.length === 0 ? (
            <div className="py-16 text-center text-neutral-400 dark:text-neutral-500">
              <div className="mb-4 text-6xl">📋</div>
              <p className="text-lg">No tasks yet</p>
              <p className="mt-1 text-sm">
                Create your first task above to get started
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={handleToggle} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
