interface TaskFormProps {
    title: string;
    description: string;
    editingId: number | null;
    titleError: string;
    priority: string;
    status: "PENDIENTE" | "EN_PROGRESO" | "COMPLETADA";
    onStatusChange: (value: "PENDIENTE" | "EN_PROGRESO" | "COMPLETADA") => void;
    onPriorityChange: (value: "ALTA" | "MEDIA" | "BAJA") => void;
    onTitleChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onSubmit: () => void;
    onCancelEdit: () => void;
}

export function TaskForm({
    title,
    description,
    editingId,
    titleError,
    onCancelEdit,
    onTitleChange,
    onDescriptionChange,
    onSubmit,
    priority,
    onPriorityChange,
    status,
    onStatusChange,
}: TaskFormProps) {
    return (
        <div>
            <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-slate-700">
                    Título
                </label>
                <input
                    type="text"
                    placeholder="Ej: Aprender TypeScript"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    className={`w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 ${titleError
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                        }`}
                />
                {titleError && (
                    <p className="mt-1 text-sm font-medium text-red-600">
                        {titleError}
                    </p>
                )}
            </div>

            <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-slate-700">
                    Descripción
                </label>
                <textarea
                    placeholder="Describe brevemente la tarea..."
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    className="min-h-24 w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
            </div>

            <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-slate-700">
                    Prioridad
                </label>

                <select
                    value={priority}
                    onChange={(e) =>
                        onPriorityChange(
                            e.target.value as "ALTA" | "MEDIA" | "BAJA"
                        )
                    }
                    className="w-full rounded-lg border border-slate-300 px-4 py-2"
                >
                    <option value="ALTA">🔴 Alta</option>
                    <option value="MEDIA">🟡 Media</option>
                    <option value="BAJA">🟢 Baja</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-slate-700">
                    Estado
                </label>

                <select
                    value={status}
                    onChange={(e) =>
                        onStatusChange(
                            e.target.value as "PENDIENTE" | "EN_PROGRESO" | "COMPLETADA"
                        )
                    }
                    className="w-full rounded-lg border border-slate-300 px-4 py-2"
                >
                    <option value="PENDIENTE">📋 Pendiente</option>
                    <option value="EN_PROGRESO">⚙️ En progreso</option>
                    <option value="COMPLETADA">✅ Completada</option>
                </select>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={onSubmit}
                    className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
                >
                    {editingId ? "Actualizar tarea" : "Crear tarea"}
                </button>

                {editingId && (
                    <button
                        onClick={onCancelEdit}
                        className="rounded-lg bg-slate-200 px-5 py-2 font-medium text-slate-700 transition hover:bg-slate-300"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </div>
    );
}