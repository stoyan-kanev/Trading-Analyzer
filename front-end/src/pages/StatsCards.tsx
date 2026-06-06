const stats = [
    { label: "Total Analyses", value: "24" },
    { label: "Trade Decisions", value: "9" },
    { label: "Winrate", value: "62%" },
    { label: "Average RR", value: "2.1R" },
];

export function StatsCards() {
    return (
        <section className="stats-grid">
            {stats.map((stat) => (
                    <div className="dashboard-card stat-card" key={stat.label}>
                    <span>{stat.label}</span>
                    <strong>{stat.value}</strong>
                    </div>
    ))}
    </section>
);
}