import { useEffect, useState, type ReactNode } from "react";

import { AuthContext, type User } from "./AuthContext";

import { authService } from "../services/authService";
import type {RegisterData} from "../types/interfaces.ts";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        authService
            .me()
            .then((res) => {
                if (mounted) {
                    setUser(res.data);
                }
            })
            .catch(() => {
                if (mounted) {
                    setUser(null);
                }
            })
            .finally(() => {
                if (mounted) {
                    setLoading(false);
                }
            });

        return () => {
            mounted = false;
        };
    }, []);

    async function login(email: string, password: string) {
        await authService.login({
            email,
            password,
        });

        const res = await authService.me();

        setUser(res.data);
    }

    async function register(data: RegisterData) {
        await authService.register(data);
    }

    async function logout() {
        await authService.logout();

        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: !!user,

                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}