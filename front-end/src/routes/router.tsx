import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../components/LoginPage/LoginPage.tsx";
import RegisterPage from "../components/RegisterPage/RegisterPage.tsx";
import AppLayout from "../App.tsx";
import HomePage from "../components/Home/HomePage.tsx";
import {DashboardPage} from "../pages/DashboardPage.tsx";


export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <HomePage/>,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/register",
                element: <RegisterPage />,
            },
            {
                path: "dashboard",
                element: <DashboardPage/>
            },
            {
                path: "*",
                element: <Navigate to="/" replace />,
            },
        ],
    },
]);