import type { Task } from "../types/task";
import { api } from "./api";

export const getTasks = async (): Promise<Task[]> => {
    const response = await api.get("/tasks");
    return response.data;
};

export const createTask = async (
    title: string,
    description: string,
    priority: string,
    status: string
): Promise<Task> => {
    const response = await api.post("/tasks", {
        title,
        description,
        priority,
        status,
    });

    return response.data;
};

export const updateTask = async (
    task: Partial<Task> & { id: number }
): Promise<Task> => {
    const response = await api.put(`/tasks/${task.id}`, task);
    return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
};