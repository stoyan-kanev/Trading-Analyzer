import {Link} from "react-router-dom";

const analyses = [
    {
        pair: "GBP/JPY",
        score: 8,
        decision: "TRADE",
        session: "London",
        date: "2026-06-06",
    },
    {
        pair: "EUR/USD",
        score: 5,
        decision: "WAIT",
        session: "New York",
        date: "2026-06-05",
    },
    {
        pair: "XAU/USD",
        score: 3,
        decision: "NO TRADE",
        session: "London",
        date: "2026-06-04",
    },
];

export function RecentAnalysesTable() {
    return (
        <section className="dashboard-card">
            <div className="section-header">
                <h2>Recent Analyses</h2>
                <Link className="secondary-btn" to={"/history"}>View All</Link>
            </div>

            <table className="analyses-table">
                <thead>
                <tr>
                    <th>Pair</th>
                    <th>Score</th>
                    <th>Decision</th>
                    <th>Session</th>
                    <th>Date</th>
                </tr>
                </thead>

                <tbody>
                {analyses.map((analysis) => (
                    <tr key={`${analysis.pair}-${analysis.date}`}>
                        <td>{analysis.pair}</td>
                        <td>{analysis.score}/10</td>
                        <td>{analysis.decision}</td>
                        <td>{analysis.session}</td>
                        <td>{analysis.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
}