import { Task } from "../types/task";

import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const addTask = async (task: Omit<Task, "id">) => {
  try {
    await addDoc(collection(db, "tasks"), task);
  } catch (error) {
    console.error(error);
  }
};

export const getTasksForUser = async (userId: string) => {
  try {
    const q = query(
      collection(db, "tasks"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Task, "id">),
    }));
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
};

export const toggleTask = async (taskId: string, curStatus: boolean) => {
  try {
    const docRef = doc(db, "tasks", taskId);
    await updateDoc(docRef, { done: !curStatus });
  } catch (error) {
    console.error(error);
  }
};

export const updateTask = async (
  taskId: string,
  title: string,
  description?: string
) => {
  try {
    const docRef = doc(db, "tasks", taskId);
    await updateDoc(docRef, { title: title, description: description });
  } catch (error) {
    console.error(error);
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const docRef = doc(db, "tasks", taskId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(error);
  }
};
