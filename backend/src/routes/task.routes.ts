import { Router } from "express";
import * as taskController from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, taskController.list);
router.post("/", authMiddleware, taskController.create);
router.put("/:id", authMiddleware, taskController.update);
router.delete("/:id", authMiddleware, taskController.remove);

export default router;