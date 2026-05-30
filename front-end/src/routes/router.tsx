import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../components/LoginPage/LoginPage.tsx";


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
        path: "*",
        element: <Navigate to="/dashboard" replace />,
    },
]);