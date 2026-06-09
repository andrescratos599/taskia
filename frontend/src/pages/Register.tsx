import { useState } from "react";
import { register } from "../services/authService";
import Swal from "sweetalert2";

interface RegisterProps {
    onGoToLogin: () => void;
}

export function Register({ onGoToLogin }: RegisterProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Swal.fire({
                title: "Campos incompletos",
                text: "Nombre, correo y contraseña son obligatorios.",
                icon: "warning",
            });
            return;
        }

        try {
            await register(name, email, password);

            Swal.fire({
                title: "Cuenta creada",
                text: "Ahora puedes iniciar sesión.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            onGoToLogin();
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "No se pudo registrar el usuario.",
                icon: "error",
            });
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
                <h1 className="mb-2 text-center text-3xl font-bold text-slate-800">
                    Crear cuenta
                </h1>

                <p className="mb-6 text-center text-slate-500">
                    Regístrate para usar TaskIA
                </p>

                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Nombre
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Correo
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <button
                    onClick={handleRegister}
                    className="w-full rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
                >
                    Registrarme
                </button>

                <button
                    onClick={onGoToLogin}
                    className="mt-4 w-full text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                    Ya tengo cuenta
                </button>
            </div>
        </main>
    );
}