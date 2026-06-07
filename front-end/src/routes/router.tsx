import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../components/LoginPage/LoginPage.tsx";
import RegisterPage from "../components/RegisterPage/RegisterPage.tsx";
import AppLayout from "../App.tsx";
import HomePage from "../components/Home/HomePage.tsx";
import {DashboardPage} from "../components/Dashboard/DashboardPage.tsx";
import {AnalysisPage} from "../components/Analysis/AnalysisPage.tsx";
import {AuthRoute} from "./authRoute.tsx";
import {RouteGuard} from "./RouteGuard.tsx";
import {HistoryPage} from "../components/History/HistoryPage.tsx";
import {AnalysisDetailsPage} from "../components/AnalysisDetails/AnalysisDetailPage.tsx";


export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <HomePage/>,
            },
            {
                element: <RouteGuard/>,
                children:[
                    {
                        path: "/login",
                        element: <LoginPage />,
                    },
                    {
                        path: "/register",
                        element: <RegisterPage />,
                    },
                ]
            },

            {
                element: <AuthRoute />,
                children: [
                    {
                        path: "dashboard",
                        element: <DashboardPage />,
                    },
                    {
                        path: "analysis/new",
                        element: <AnalysisPage />,
                    },
                    {
                        path: "history",
                        element: <HistoryPage />,
                    },
                    {
                        path: "/analysis/:id",
                        element: <AnalysisDetailsPage />,
                    },
                ],
            },
            {
                path: "*",
                element: <Navigate to="/" replace />,
            },
        ],
    },
]);