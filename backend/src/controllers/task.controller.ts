import { Response } from "express";
import * as taskService from "../services/task.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export const list = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({
            mensaje: "Usuario no autenticado",
        });
    }

    const tasks = await taskService.getTasks(userId);
    res.json(tasks);
};

export const create = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const { title, description, priority, status } = req.body;

    if (!userId) {
        return res.status(401).json({
            mensaje: "Usuario no autenticado",
        });
    }

    if (!title || title.trim() === "") {
        return res.status(400).json({
            mensaje: "El título es obligatorio",
        });
    }

    const task = await taskService.createTask(title, description, userId, priority || "MEDIA", status || "PENDIENTE");

    res.status(201).json(task);
};

export const update = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const id = Number(req.params.id);
    const { title, description, completed, priority, status } = req.body;

    if (!userId) {
        return res.status(401).json({
            mensaje: "Usuario no autenticado",
        });
    }

    const task = await taskService.updateTask(
        id,
        userId,
        title,
        description,
        completed,
        priority,
        status
    );

    res.json(task);
};

export const remove = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const id = Number(req.params.id);

    if (!userId) {
        return res.status(401).json({
            mensaje: "Usuario no autenticado",
        });
    }

    await taskService.deleteTask(id, userId);

    res.json({
        mensaje: "Tarea eliminada correctamente",
    });
};