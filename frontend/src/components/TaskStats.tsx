import type { Task } from "../types/task";

interface TaskStatsProps {
    tasks: Task[];
}

export function TaskStats({ tasks }: TaskStatsProps) {
    const total = tasks.length;

    const completed = tasks.filter(
        (task) => task.completed
    ).length;

    const pending = total - completed;

    return (
        <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-white p-5 shadow">
                <h3 className="text-sm font-medium text-slate-500">
                    Total
                </h3>

                <p className="mt-2 text-3xl font-bold">
                    {total}
                </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow">
                <h3 className="text-sm font-medium text-slate-500">
                    Pendientes
                </h3>

                <p className="mt-2 text-3xl font-bold">
                    {pending}
                </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow">
                <h3 className="text-sm font-medium text-slate-500">
                    Completadas
                </h3>

                <p className="mt-2 text-3xl font-bold">
                    {completed}
                </p>
            </div>
        </div>
    );
}