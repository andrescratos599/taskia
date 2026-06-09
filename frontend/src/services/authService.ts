import { api } from "./api";

export interface AuthUser {
    id: number;
    name: string;
    email: string;
}

export interface LoginResponse {
    token: string;
    user: AuthUser;
}

export const register = async (
    name: string,
    email: string,
    password: string
) => {
    const response = await api.post("/auth/register", {
        name,
        email,
        password,
    });

    return response.data;
};

export const login = async (
    email: string,
    password: string
): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", {
        email,
        password,
    });

    return response.data;
};