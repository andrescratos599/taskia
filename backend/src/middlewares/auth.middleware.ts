import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "taskia_secret_dev";

interface TokenPayload {
    id: number;
    email: string;
}

export interface AuthRequest extends Request {
    user?: TokenPayload;
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            mensaje: "Token no proporcionado",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            mensaje: "Token inválido o expirado",
        });
    }
};