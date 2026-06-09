import type { Task } from "../types/task";

interface TaskDetailModalProps {
    task: Task | null;
    onClose: () => void;
}

export function TaskDetailModal({
    task,
    onClose,
}: TaskDetailModalProps) {
    if (!task) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800">
                        {task.title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-full bg-slate-100 px-3 py-1 text-slate-600 hover:bg-slate-200"
                    >
                        ✕
                    </button>
                </div>

                <p className="mb-5 text-slate-600">
                    {task.description || "Sin descripción"}
                </p>

                <div className="space-y-3 text-sm">
                    <div>
                        <strong>Prioridad:</strong> {task.priority}
                    </div>

                    <div>
                        <strong>Estado:</strong>{" "}
                        {task.status === "PENDIENTE"
                            ? "Pendiente"
                            : task.status === "EN_PROGRESO"
                                ? "En progreso"
                                : "Completada"}
                    </div>

                    <div>
                        <strong>Fecha creación:</strong>{" "}
                        {new Date(task.createdAt).toLocaleString("es-CO")}
                    </div>
                </div>
            </div>
        </div>
    );
}