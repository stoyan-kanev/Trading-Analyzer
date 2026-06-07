
export interface RegisterData {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export type User = {
    email: string;
    first_name: string;
    last_name: string;
};



export type AuthContextType = {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;

    login: (email: string, password: string) => Promise<void>;

    register: (data: RegisterData) => Promise<void>;

    logout: () => Promise<void>;
};