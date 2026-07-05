import type { DashboardStats } from "../../types/analysisTypes.ts";

type StatsCardsProps = {
    stats?: DashboardStats;
};

export function StatsCards({ stats }: StatsCardsProps) {
    const cards = [
        {
            label: "Total Analyses",
            value: stats?.total_analyses ?? 0,
        },
        {
            label: "Trade Decisions",
            value: stats?.trade_decisions ?? 0,
        },
        {
            label: "Trade Rate",
            value: `${stats?.trade_decision_rate ?? 0}%`,
        },
        {
            label: "Average RR",
            value: `${stats?.avg_rr ?? 0}R`,
        },
    ];

    return (
        <section className="stats-grid">
            {cards.map((stat) => (
                <div className="dashboard-card stat-card" key={stat.label}>
                    <span>{stat.label}</span>
                    <strong>{stat.value}</strong>
                </div>
            ))}
        </section>
    );
}