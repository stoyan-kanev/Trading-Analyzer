import type {LoginData, RegisterData} from "../types/userTypes.ts";
import { api } from "./api";

export const authService = {
    register({ email, firstName, lastName, password }: RegisterData) {
        return api.post('/users/register/', {
            email,
            first_name: firstName,
            last_name: lastName,
            password,
        });
    },

    login({ email, password }: LoginData) {
        return api.post('/users/login/', {
            email,
            password,
        });
    },
    logout: () => api.post("/users/logout/"),

    me: () => api.get("/users/me/"),

    refresh: () => api.post("/users/refresh/"),
}