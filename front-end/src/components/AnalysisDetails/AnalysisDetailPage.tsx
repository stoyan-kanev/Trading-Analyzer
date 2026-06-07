import { useNavigate, useParams } from "react-router-dom";
import "./AnalysisPage.css"
const mockAnalyses = [
    {
        id: "1",
        pair: "GBP/JPY",
        score: 8,
        decision: "TRADE",
        session: "London",
        dailyBias: "Bullish",
        h4Bias: "Bullish",
        zoneType: "Order Block",
        confirmation: "BOS",
        rr: "2.4",
        date: "2026-06-06",
        notes: "Clean bullish continuation setup after liquidity sweep.",
        reasons: [
            "Daily and 4H bias are aligned.",
            "Price is reacting from a valid zone.",
            "Liquidity sweep detected.",
            "Lower timeframe confirmation detected.",
            "Risk-to-reward is acceptable.",
        ],
        warnings: [
            "Wait for strong candle close before entry.",
        ],
    },
    {
        id: "2",
        pair: "EUR/USD",
        score: 5,
        decision: "WAIT",
        session: "New York",
        dailyBias: "Bullish",
        h4Bias: "Neutral",
        zoneType: "FVG",
        confirmation: "CHOCH",
        rr: "1.8",
        date: "2026-06-05",
        notes: "Setup has potential, but higher timeframe bias is not clean.",
        reasons: [
            "Price is reacting from a valid zone.",
            "Lower timeframe confirmation detected.",
            "Risk-to-reward is acceptable.",
        ],
        warnings: [
            "Daily and 4H bias are not aligned.",
            "Wait for additional confirmation.",
        ],
    },
    {
        id: "3",
        pair: "XAU/USD",
        score: 3,
        decision: "NO TRADE",
        session: "London",
        dailyBias: "Bearish",
        h4Bias: "Bullish",
        zoneType: "None",
        confirmation: "None",
        rr: "1.1",
        date: "2026-06-04",
        notes: "Conflicting bias and weak confirmation.",
        reasons: [],
        warnings: [
            "Daily and 4H bias are not aligned.",
            "Zone type is weak or missing.",
            "No liquidity sweep detected.",
            "No strong confirmation detected.",
            "Risk-to-reward is weak.",
        ],
    },
];

export function AnalysisDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const analysis = mockAnalyses.find((item) => item.id === id);

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
                        <p>{analysis.date} • {analysis.session} Session</p>
                    </div>

                    <span
                        className={`details-decision decision-${analysis.decision
                            .toLowerCase()
                            .replace(" ", "-")}`}
                    >
                        {analysis.decision}
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
                            <strong>{analysis.dailyBias}</strong>
                        </div>

                        <div className="details-info-item">
                            <span>4H Bias</span>
                            <strong>{analysis.h4Bias}</strong>
                        </div>

                        <div className="details-info-item">
                            <span>Zone Type</span>
                            <strong>{analysis.zoneType}</strong>
                        </div>

                        <div className="details-info-item">
                            <span>Confirmation</span>
                            <strong>{analysis.confirmation}</strong>
                        </div>

                        <div className="details-info-item">
                            <span>Risk Reward</span>
                            <strong>{analysis.rr}R</strong>
                        </div>

                        <div className="details-info-item">
                            <span>Session</span>
                            <strong>{analysis.session}</strong>
                        </div>
                    </div>

                    <div className="details-section">
                        <h2>Notes</h2>
                        <p>{analysis.notes}</p>
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
                            {analysis.warnings.map((warning) => (
                                <div className="details-item warning" key={warning}>
                                    <span>!</span>
                                    <p>{warning}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </section>
        </main>
    );
}