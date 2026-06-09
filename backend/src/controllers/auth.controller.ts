import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                mensaje: "Nombre, correo y contraseña son obligatorios",
            });
        }

        const user = await authService.registerUser(name, email, password);

        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            user,
        });
    } catch (error: any) {
        res.status(400).json({
            mensaje: error.message || "Error al registrar usuario",
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                mensaje: "Correo y contraseña son obligatorios",
            });
        }

        const data = await authService.loginUser(email, password);

        res.json(data);
    } catch (error: any) {
        res.status(401).json({
            mensaje: error.message || "Error al iniciar sesión",
        });
    }
};