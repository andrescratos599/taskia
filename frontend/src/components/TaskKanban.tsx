import {
    DndContext,
    type DragEndEvent,
    useDroppable,
    useDraggable,
} from "@dnd-kit/core";
import type { Task } from "../types/task";

type TaskStatus = "PENDIENTE" | "EN_PROGRESO" | "COMPLETADA";

interface TaskKanbanProps {
    tasks: Task[];
    onView: (task: Task) => void;
    onEdit: (task: Task) => void;
    onDelete: (id: number) => void;
    onChangeStatus: (task: Task, status: TaskStatus) => void;
}

const columns: { title: string; status: TaskStatus }[] = [
    { title: "📋 Pendiente", status: "PENDIENTE" },
    { title: "⚙️ En progreso", status: "EN_PROGRESO" },
    { title: "✅ Completada", status: "COMPLETADA" },
];

function DroppableColumn({
    id,
    children,
}: {
    id: TaskStatus;
    children: React.ReactNode;
}) {
    const { setNodeRef, isOver } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className={`rounded-xl border p-4 transition ${isOver
                    ? "border-blue-400 bg-blue-50"
                    : "border-slate-200 bg-slate-50"
                }`}
        >
            {children}
        </div>
    );
}

function DraggableTaskCard({
    task,
    onView,
    onEdit,
    onDelete,
}: {
    task: Task;
    onView: (task: Task) => void;
    onEdit: (task: Task) => void;
    onDelete: (id: number) => void;
}) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
        : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="rounded-lg bg-white p-4 shadow-sm"
        >
            <div
                {...listeners}
                {...attributes}
                className="mb-3 cursor-grab rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-500 active:cursor-grabbing"
            >
                Arrastrar
            </div>

            <h3 className="font-semibold text-slate-800">{task.title}</h3>

            <p className="mt-1 text-sm text-slate-500">
                {task.description || "Sin descripción"}
            </p>

            <div className="mt-3">
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
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                <button
                    onClick={() => onView(task)}
                    className="rounded-lg bg-sky-100 px-3 py-2 text-xs font-medium text-sky-700 hover:bg-sky-200"
                >
                    Ver
                </button>

                <button
                    onClick={() => onEdit(task)}
                    className="rounded-lg bg-indigo-100 px-3 py-2 text-xs font-medium text-indigo-700 hover:bg-indigo-200"
                >
                    Editar
                </button>

                <button
                    onClick={() => onDelete(task.id)}
                    className="rounded-lg bg-red-100 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-200"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}

export function TaskKanban({
    tasks,
    onView,
    onEdit,
    onDelete,
    onChangeStatus,
}: TaskKanbanProps) {
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const taskId = Number(active.id);
        const newStatus = over.id as TaskStatus;

        const task = tasks.find((item) => item.id === taskId);

        if (!task) return;

        if (task.status === newStatus) return;

        onChangeStatus(task, newStatus);
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="grid gap-4 md:grid-cols-3">
                {columns.map((column) => {
                    const columnTasks = tasks.filter(
                        (task) => task.status === column.status
                    );

                    return (
                        <DroppableColumn key={column.status} id={column.status}>
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="font-semibold text-slate-700">
                                    {column.title}
                                </h2>

                                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                                    {columnTasks.length}
                                </span>
                            </div>

                            <div className="space-y-3">
                                {columnTasks.length === 0 && (
                                    <p className="text-sm text-slate-400">Sin tareas</p>
                                )}

                                {columnTasks.map((task) => (
                                    <DraggableTaskCard
                                        key={task.id}
                                        task={task}
                                        onView={onView}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                    />
                                ))}
                            </div>
                        </DroppableColumn>
                    );
                })}
            </div>
        </DndContext>
    );
}