import "./History.css"
const analyses = [
    {
        id: 1,
        pair: "GBP/JPY",
        score: 8,
        decision: "TRADE",
        session: "London",
        date: "2026-06-06",
    },
    {
        id: 2,
        pair: "EUR/USD",
        score: 5,
        decision: "WAIT",
        session: "New York",
        date: "2026-06-05",
    },
    {
        id: 3,
        pair: "XAU/USD",
        score: 3,
        decision: "NO TRADE",
        session: "London",
        date: "2026-06-04",
    },
];

export function HistoryPage() {
    return (
        <main className="history-page">
            <section className="history-header">
                <p className="history-kicker">Trading Records</p>
                <h1>Analysis History</h1>
                <p>Review your previous setup evaluations and decisions.</p>
            </section>

            <section className="history-card">
                <div className="history-card-header">
                    <div>
                        <h2>Recent Analyses</h2>
                        <p>Track every evaluated setup in one place.</p>
                    </div>
                </div>

                <div className="history-table-wrapper">
                    <table className="history-table">
                        <thead>
                        <tr>
                            <th>Pair</th>
                            <th>Score</th>
                            <th>Decision</th>
                            <th>Session</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {analyses.map((analysis) => (
                            <tr key={analysis.id}>
                                <td>{analysis.pair}</td>
                                <td>{analysis.score}/10</td>
                                <td>
                                    <span
                                        className={`history-decision decision-${analysis.decision
                                            .toLowerCase()
                                            .replace(" ", "-")}`}
                                    >
                                        {analysis.decision}
                                    </span>
                                </td>
                                <td>{analysis.session}</td>
                                <td>{analysis.date}</td>
                                <td>
                                    <button className="history-action-btn">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}