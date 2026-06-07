import { createContext } from "react";
import type {AuthContextType} from "../types/userTypes.ts";



export const AuthContext = createContext<AuthContextType | null>(null);