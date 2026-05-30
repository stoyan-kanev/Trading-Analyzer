import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../components/LoginPage/LoginPage.tsx";
import RegisterPage from "../components/RegisterPage/RegisterPage.tsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/" replace />,
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "/register",
        element: <RegisterPage/>,
    },
    {
        path: "*",
        element: <Navigate to="/dashboard" replace />,
    },
]);