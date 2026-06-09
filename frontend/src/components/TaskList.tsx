import type { Task } from "../types/task";

interface TaskListProps {
    tasks: Task[];
    onToggleCompleted: (task: Task) => void;
    onEdit: (task: Task) => void;
    onDelete: (id: number) => void;
}

export function TaskList({
    tasks,
    onToggleCompleted,
    onEdit,
    onDelete,
}: TaskListProps) {
    if (tasks.length === 0) {
        return (
            <p className="text-center text-slate-500">
                No tienes tareas registradas.
            </p>
        );
    }

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3
                                className={`text-lg font-semibold ${task.completed
                                    ? "text-slate-400 line-through"
                                    : "text-slate-800"
                                    }`}
                            >
                                {task.title}
                            </h3>

                            <span
                                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${task.priority === "ALTA"
                                    ? "bg-red-100 text-red-700"
                                    : task.priority === "MEDIA"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-green-100 text-green-700"
                                    }`}
                            >
                                {task.priority}
                            </span>

                            <span
                                className={`ml-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${task.status === "PENDIENTE"
                                        ? "bg-slate-100 text-slate-700"
                                        : task.status === "EN_PROGRESO"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-green-100 text-green-700"
                                    }`}
                            >
                                {task.status === "PENDIENTE"
                                    ? "Pendiente"
                                    : task.status === "EN_PROGRESO"
                                        ? "En progreso"
                                        : "Completada"}
                            </span>

                            <p className="mt-1 text-sm text-slate-500">
                                {task.description || "Sin descripción"}
                            </p>

                            <p className="mt-2 text-xs text-slate-400">
                                Creada el{" "}
                                {new Date(task.createdAt).toLocaleDateString("es-CO", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>

                        <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${task.completed
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                                }`}
                        >
                            {task.completed ? "Completada" : "Pendiente"}
                        </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        <button
                            onClick={() => onToggleCompleted(task)}
                            className="rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300"
                        >
                            {task.completed ? "Marcar pendiente" : "Completar"}
                        </button>

                        <button
                            onClick={() => onEdit(task)}
                            className="rounded-lg bg-indigo-100 px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200"
                        >
                            Editar
                        </button>

                        <button
                            onClick={() => onDelete(task.id)}
                            className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}