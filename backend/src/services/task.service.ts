import { prisma } from "../prisma";

export const getTasks = async (userId: number) => {
    return prisma.task.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const createTask = async (
    title: string,
    description: string | undefined,
    userId: number,
    priority: string,
    status: string
) => {
    return prisma.task.create({
        data: {
            title,
            description,
            userId,
            priority,
            status,
        },
    });
};

export const updateTask = async (
    id: number,
    userId: number,
    title: string,
    description: string | null,
    completed?: boolean,
    priority?: string,
    status?: string
) => {
    const task = await prisma.task.findFirst({
        where: {
            id,
            userId,
        },
    });

    if (!task) {
        throw new Error("Tarea no encontrada o no pertenece al usuario");
    }

    return prisma.task.update({
        where: {
            id,
        },
        data: {
            title,
            description,
            completed,
            priority,
            status,
        },
    });
};

export const deleteTask = async (id: number, userId: number) => {
    const task = await prisma.task.findFirst({
        where: {
            id,
            userId,
        },
    });

    if (!task) {
        throw new Error("Tarea no encontrada o no pertenece al usuario");
    }

    return prisma.task.delete({
        where: {
            id,
        },
    });
};