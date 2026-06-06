import {StatsCards} from "./StatsCards.tsx";
import {RecentAnalysesTable} from "./RecentAnalysesTable.tsx";
import './DashBoard.css'
import { useNavigate } from "react-router-dom";


export function DashboardPage() {


    const navigate = useNavigate();

    return (
        <main className="dashboard-page">
            <section className="dashboard-header">
                <div>
                    <p className="dashboard-kicker">Trading Analyzer</p>
                    <h1>Dashboard</h1>
                    <p>Track your setup quality, decisions and trading performance.</p>
                </div>

                <button
                    className="dashboard-primary-btn"
                    onClick={() => navigate("/analysis/new")}
                >
                    New Analysis
                </button>
            </section>

            <StatsCards />

            <section className="dashboard-grid">
                <div className="dashboard-card">
                    <h2>Decision Breakdown</h2>
                    <p className="muted">Chart placeholder</p>
                </div>

                <div className="dashboard-card">
                    <h2>Session Performance</h2>
                    <p className="muted">Chart placeholder</p>
                </div>
            </section>

            <RecentAnalysesTable />
        </main>
    );
}