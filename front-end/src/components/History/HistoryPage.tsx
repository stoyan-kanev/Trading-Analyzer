import "./History.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {AnalysisService} from "../../services/analysisService.ts";
import type {AnalysisResponse} from "../../types/analysisTypes.ts";
import {formatSession} from "../../helpers/formatSession.tsx";
import {formatDate} from "../../helpers/formatDate.tsx";

export function HistoryPage() {
    const navigate = useNavigate();

    const [analyses, setAnalyses] = useState<AnalysisResponse[]>([]);

    useEffect(() => {
        const getAnalyses = async () => {
            try {
                const result = await AnalysisService.getAnalysis();

                setAnalyses(result.data.results);
            } catch (error) {
                console.error(error);
            }
        };

        getAnalyses();
    }, []);




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
                                        {analysis.decision.toUpperCase()}
                                    </span>
                                </td>
                                <td>{formatSession(analysis.session)}</td>
                                <td>{formatDate(analysis.created_at)}</td>
                                <td>
                                    <button
                                        className="history-action-btn"
                                        onClick={() => navigate(`/analysis/${analysis.id}`)}
                                    >
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