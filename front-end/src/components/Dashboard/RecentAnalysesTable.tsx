import { Link } from "react-router-dom";
import type { AnalysisResponse } from "../../types/analysisTypes.ts";
import { formatDate } from "../../helpers/formatDate.tsx";
import { formatSession } from "../../helpers/formatSession.tsx";

type RecentAnalysesTableProps = {
    analyses: AnalysisResponse[];
};

export function RecentAnalysesTable({ analyses }: RecentAnalysesTableProps) {
    return (
        <section className="dashboard-card">
            <div className="section-header">
                <h2>Recent Analyses</h2>
                <Link className="secondary-btn" to="/history">
                    View All
                </Link>
            </div>

            {analyses.length === 0 ? (
                <p className="dashboard-placeholder">No analyses yet.</p>
            ) : (
                <table className="analyses-table">
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
                            <td>{analysis.decision.toUpperCase()}</td>
                            <td>{formatSession(analysis.session)}</td>
                            <td>{formatDate(analysis.created_at)}</td>
                            <td>
                                <Link
                                    className="table-link"
                                    to={`/analysis/${analysis.id}`}
                                >
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}