import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { StatsCards } from "./StatsCards.tsx";
import { RecentAnalysesTable } from "./RecentAnalysesTable.tsx";
import { AnalysisService } from "../../services/analysisService.ts";
import type { DashboardStatsResponse } from "../../types/analysisTypes.ts";

import "./DashBoard.css";
import {DecisionBreakdown} from "./DecisionBreakdown.tsx";
import {SessionPerformance} from "./SessionPerformance.tsx";

export function DashboardPage() {
    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState<DashboardStatsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);
                setErrorMessage(null);

                const result = await AnalysisService.getAnalysisStats();

                setDashboardData(result.data);
            } catch (err) {
                console.log(err);
                setErrorMessage("Failed to load dashboard data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (isLoading) {
        return (
            <main className="dashboard-page">
                <p className="dashboard-placeholder">Loading dashboard...</p>
            </main>
        );
    }

    if (errorMessage) {
        return (
            <main className="dashboard-page">
                <p className="dashboard-error">{errorMessage}</p>
            </main>
        );
    }

    return (
        <main className="dashboard-page">
            <section className="dashboard-header">
                <div>
                    <p className="dashboard-kicker">Trading Analyzer</p>
                    <h1>Dashboard</h1>
                    <p>Track your setup quality, decisions and trading performance.</p>
                </div>

                <div className="dashboard-btn">
                    <button
                        className="dashboard-primary-btn"
                        onClick={() => navigate("/history")}
                    >
                        History
                    </button>

                    <button
                        className="dashboard-primary-btn"
                        onClick={() => navigate("/analysis/new")}
                    >
                        New Analysis
                    </button>
                </div>
            </section>

            <StatsCards stats={dashboardData?.stats} />

            <section className="dashboard-grid">
                <DecisionBreakdown data={dashboardData?.decision_breakdown ?? []} />
                <SessionPerformance data={dashboardData?.session_performance ?? []} />
            </section>

            <RecentAnalysesTable analyses={dashboardData?.recent_analyses ?? []} />
        </main>
    );
}