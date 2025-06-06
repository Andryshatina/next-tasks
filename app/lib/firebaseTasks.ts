import { Task } from "../types/task";

import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  //   deleteDoc,
  //   updateDoc,
  //   doc,
  //   query,
  //   where,
  //   orderBy,
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
