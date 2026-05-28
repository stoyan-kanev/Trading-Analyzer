import { createContext } from "react";
import type {RegisterData} from "../types/interfaces.ts";

export type User = {
    id: number;
    email: string;
    username?: string;
};



export type AuthContextType = {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;

    login: (email: string, password: string) => Promise<void>;

    register: (data: RegisterData) => Promise<void>;

    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);