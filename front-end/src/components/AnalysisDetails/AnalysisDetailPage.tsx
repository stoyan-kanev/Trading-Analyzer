import { useNavigate, useParams } from "react-router-dom";
import "./AnalysisPage.css";
import { useEffect, useState } from "react";
import { AnalysisService } from "../../services/analysisService.ts";
import type {AnalysisResponse} from "../../types/analysisTypes.ts";

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-EN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};
const formatSession = (session:string) => {
    if (session == 'new_york'){
        session = "New York";
    }else if (session == 'asia'){
        session = "Asia";
    }else if (session == 'london'){
        session = "London";
    }

    return session;
}

export function AnalysisDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);

    useEffect(() => {
        const getAnalysis = async () => {
            try {
                if (!id) return;

                const result = await AnalysisService.getAnalysisById(id);
                setAnalysis(result.data);
            } catch (error) {
                console.error(error);
            }
        };

        getAnalysis();
    }, [id]);

    if (!analysis) {
        return (
            <main className="analysis-details-page">
                <section className="details-empty-state">
                    <h1>Analysis not found</h1>
                    <p>This analysis does not exist or was removed.</p>

                    <button onClick={() => navigate("/history")}>
                        Back to History
                    </button>
                </section>
            </main>
        );
    }

    return (
        <main className="analysis-details-page">
            <section className="details-header">
                <button className="back-btn" onClick={() => navigate("/history")}>
                    ← Back to History
                </button>

                <p className="details-kicker">Analysis Review</p>

                <div className="details-title-row">
                    <div>
                        <h1>{analysis.pair}</h1>
                        <p>
                            {formatDate(analysis.created_at)} • {formatSession(analysis.session)} Session
                        </p>
                    </div>

                    <span
                        className={`details-decision decision-${analysis.decision
                            .toLowerCase()
                            .replace(" ", "-")}`}
                    >
                        {analysis.decision.toUpperCase()}
                    </span>
                </div>
            </section>

            <section className="details-layout">
                <div className="details-main-card">
                    <div className="details-score-box">
                        <span>Setup Score</span>
                        <strong>{analysis.score}/10</strong>

                        <div className="details-score-progress">
                            <div
                                className="details-score-progress-fill"
                                style={{ width: `${analysis.score * 10}%` }}
                            />
                        </div>
                    </div>

                    <div className="details-grid">
                        <div className="details-info-item">
                            <span>Daily Bias</span>
                            <strong>{analysis.daily_bias.toUpperCase()}</strong>
                        </div>

                        <div className="details-info-item">
                            <span>4H Bias</span>
                            <strong>{analysis.h4_bias.toUpperCase()}</strong>
                        </div>

                        <div className="details-info-item">
                            <span>Zone Type</span>
                            <strong>{analysis.zone_type.toUpperCase()}</strong>
                        </div>

                        <div className="details-info-item">
                            <span>Confirmation</span>
                            <strong>{analysis.confirmation.toUpperCase()}</strong>
                        </div>

                        <div className="details-info-item">
                            <span>Risk Reward</span>
                            <strong>{analysis.rr}R</strong>
                        </div>

                        <div className="details-info-item">
                            <span>Session</span>
                            <strong>{formatSession(analysis.session)}</strong>
                        </div>
                    </div>

                    <div className="details-section">
                        <h2>Notes</h2>
                        <p>{analysis.notes || "No notes added."}</p>
                    </div>
                </div>

                <aside className="details-side-card">
                    <div className="details-section">
                        <h2>Reasons</h2>

                        <div className="details-items">
                            {analysis.reasons.length > 0 ? (
                                analysis.reasons.map((reason) => (
                                    <div className="details-item success" key={reason}>
                                        <span>✓</span>
                                        <p>{reason}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="muted-text">No strong reasons detected.</p>
                            )}
                        </div>
                    </div>

                    <div className="details-section">
                        <h2>Warnings</h2>

                        <div className="details-items">
                            {analysis.warnings.length > 0 ? (
                                analysis.warnings.map((warning) => (
                                    <div className="details-item warning" key={warning}>
                                        <span>!</span>
                                        <p>{warning}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="muted-text">No warnings detected.</p>
                            )}
                        </div>
                    </div>
                </aside>
            </section>
        </main>
    );
}