export type Task = {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  createdAt: number;
  userId: number;
};
