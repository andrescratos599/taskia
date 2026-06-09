interface TaskFiltersProps {
    searchTerm: string;
    filterStatus: "all" | "PENDIENTE" | "EN_PROGRESO" | "COMPLETADA";
    onSearchChange: (value: string) => void;
    onFilterChange: (value: "all" | "PENDIENTE" | "EN_PROGRESO" | "COMPLETADA") => void;
}

export function TaskFilters({
    searchTerm,
    filterStatus,
    onSearchChange,
    onFilterChange,
}: TaskFiltersProps) {
    return (
        <div className="mb-6 rounded-xl bg-white p-4 shadow">
            <input
                type="text"
                placeholder="Buscar tarea..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="mb-4 w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => onFilterChange("all")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium ${filterStatus === "all"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                >
                    Todas
                </button>

                <button
                    onClick={() => onFilterChange("PENDIENTE")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium ${filterStatus === "PENDIENTE"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                >
                    📋 Pendientes
                </button>

                <button
                    onClick={() => onFilterChange("EN_PROGRESO")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium ${filterStatus === "EN_PROGRESO"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                >
                    ⚙️ En progreso
                </button>

                <button
                    onClick={() => onFilterChange("COMPLETADA")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium ${filterStatus === "COMPLETADA"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                >
                    ✅ Completadas
                </button>
            </div>
        </div>
    );
}