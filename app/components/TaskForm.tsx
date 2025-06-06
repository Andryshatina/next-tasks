import { useState } from "react";
import type { Task } from "../types/task";

const TaskForm = ({
  onAddTask,
}: {
  onAddTask: (task: Omit<Task, "id" | "createdAt" | "userId">) => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({
      title: title.trim(),
      description: description.trim() || "",
      done: false,
    });
    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description(optional)"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TaskForm;
