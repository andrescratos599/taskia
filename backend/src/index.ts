import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    mensaje: "API TaskIA funcionando",
  });
});

app.use("/tasks", taskRoutes);

app.listen(3000, () => {
  console.log("Servidor iniciado en puerto 3000");
});