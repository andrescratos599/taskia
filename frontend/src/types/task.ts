export interface Task {
    id: number;
    title: string;
    description: string | null;
    completed: boolean;
    priority: "ALTA" | "MEDIA" | "BAJA";
    status: "PENDIENTE" | "EN_PROGRESO" | "COMPLETADA";
    createdAt: string;
}