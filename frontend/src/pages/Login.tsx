import { useState } from "react";
import { login } from "../services/authService";
import Swal from "sweetalert2";

interface LoginProps {
    onLogin: (token: string, userName: string) => void;
    onGoToRegister: () => void;
}

export function Login({ onLogin, onGoToRegister }: LoginProps) {
    const [email, setEmail] = useState("andres.cratos599@gmail.com");
    const [password, setPassword] = useState("123456");

    const handleLogin = async () => {
        try {
            const data = await login(email, password);

            localStorage.setItem("token", data.token);
            localStorage.setItem("userName", data.user.name);

            onLogin(data.token, data.user.name);
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Correo o contraseña incorrectos.",
                icon: "error",
            });
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
                <h1 className="mb-2 text-center text-3xl font-bold text-slate-800">
                    TaskIA 🚀
                </h1>

                <p className="mb-6 text-center text-slate-500">
                    Inicia sesión para gestionar tus tareas
                </p>

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
                    onClick={handleLogin}
                    className="w-full rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
                >
                    Iniciar sesión
                </button>

                <button
                    onClick={onGoToRegister}
                    className="mt-4 w-full text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                    Crear una cuenta
                </button>
            </div>
        </main>
    );
}