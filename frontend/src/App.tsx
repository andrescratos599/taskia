import { useEffect, useMemo, useState } from "react";
import type { Task } from "./types/task";
import { TaskForm } from "./components/TaskForm";
import { TaskStats } from "./components/TaskStats";
import { TaskFilters } from "./components/TaskFilters";
import { TaskSearch } from "./components/TaskSearch";
import Swal from "sweetalert2";
import { TaskDetailModal } from "./components/TaskDetailModal";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { TaskKanban } from "./components/TaskKanban";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskService";

type FilterStatus = "all" | "PENDIENTE" | "EN_PROGRESO" | "COMPLETADA";
type TaskStatus = "PENDIENTE" | "EN_PROGRESO" | "COMPLETADA";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [authPage, setAuthPage] = useState<"login" | "register">("login");
  const [priority, setPriority] = useState<"ALTA" | "MEDIA" | "BAJA">("MEDIA");
  const [status, setStatus] = useState<"PENDIENTE" | "EN_PROGRESO" | "COMPLETADA">("PENDIENTE");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);


  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      setError("No se pudieron cargar las tareas.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      setTitleError("El título es obligatorio.");
      return;
    }

    setTitleError("");

    try {
      setError("");

      if (editingId) {
        await updateTask({
          id: editingId,
          title,
          description,
          priority,
          status,
        });
      } else {
        await createTask(title, description, priority, status);
      }

      setTitle("");
      setDescription("");
      setPriority("MEDIA");
      setStatus("PENDIENTE");
      setEditingId(null);

      Swal.fire({
        title: editingId ? "Tarea actualizada" : "Tarea creada",
        text: editingId
          ? "La tarea fue actualizada correctamente."
          : "La tarea fue creada correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      loadTasks();
    } catch (error) {
      setError("No se pudo guardar la tarea.");
    }
  };

  const handleEdit = (task: Task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setDescription(task.description || "");
    setStatus(task.status);
    setPriority(task.priority);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Eliminar tarea?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
    });

    if (!result.isConfirmed) return;

    try {
      setError("");

      await deleteTask(id);
      loadTasks();

      Swal.fire({
        title: "Eliminada",
        text: "La tarea fue eliminada correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      setError("No se pudo eliminar la tarea.");

      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar la tarea.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    if (token) {
      loadTasks();
    }
  }, [token]);

  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setPriority("MEDIA");
    setStatus("PENDIENTE");
    setTitleError("");
  };

  const handleLogin = (token: string, userName: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);

    setToken(token);
    setUserName(userName);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setToken(null);
    setUserName("");
    setTasks([]);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "all" ? true : task.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchTerm, filterStatus]);

  if (!token) {
    if (authPage === "register") {
      return <Register onGoToLogin={() => setAuthPage("login")} />;
    }

    return (
      <Login
        onLogin={handleLogin}
        onGoToRegister={() => setAuthPage("register")}
      />
    );
  }

  const handleChangeStatus = async (task: Task, newStatus: TaskStatus) => {
    const previousTasks = tasks;

    const updatedTasks = tasks.map((item) =>
      item.id === task.id
        ? {
          ...item,
          status: newStatus,
          completed: newStatus === "COMPLETADA",
        }
        : item
    );

    setTasks(updatedTasks);

    try {
      setError("");

      await updateTask({
        ...task,
        status: newStatus,
        completed: newStatus === "COMPLETADA",
      });
    } catch (error) {
      setTasks(previousTasks);
      setError("No se pudo cambiar el estado de la tarea.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800">
            TaskIA 🚀
          </h1>
          <p className="mt-2 text-slate-500">
            Gestor de tareas moderno con React, Node, Prisma y PostgreSQL
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <TaskStats tasks={tasks} />

          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              Usuario: {userName}
            </span>

            <button
              onClick={handleLogout}
              className="rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
            >
              Cerrar sesión
            </button>
          </div>

          <TaskFilters
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            onSearchChange={setSearchTerm}
            onFilterChange={setFilterStatus}
          />

          <TaskSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          {loading && (
            <div className="mb-4 rounded-lg bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
              Cargando tareas...
            </div>
          )}

          <TaskForm
            title={title}
            description={description}
            editingId={editingId}
            titleError={titleError}
            priority={priority}
            status={status}
            onStatusChange={setStatus}
            onPriorityChange={setPriority}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onSubmit={handleSubmit}
            onCancelEdit={cancelEdit}
          />

          <div className="my-6 border-t border-slate-200" />

          <TaskKanban
            tasks={filteredTasks}
            onView={setSelectedTask}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onChangeStatus={handleChangeStatus}
          />

          <TaskDetailModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
          />
        </div>
      </div>
    </main>
  );
}

export default App;