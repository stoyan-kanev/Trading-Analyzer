import type { DecisionBreakdownItem } from "../../types/analysisTypes.ts";

type DecisionBreakdownProps = {
    data: DecisionBreakdownItem[];
};

function formatDecision(decision: string) {
    if (decision === "no_trade") {
        return "No Trade";
    }

    return decision.charAt(0).toUpperCase() + decision.slice(1);
}

export function DecisionBreakdown({ data }: DecisionBreakdownProps) {
    const total = data.reduce((sum, item) => sum + item.count, 0);

    return (
        <div className="dashboard-card">
            <h2>Decision Breakdown</h2>

            {data.length === 0 || total === 0 ? (
                <p className="muted">No decision data yet.</p>
            ) : (
                <div className="breakdown-list">
                    {data.map((item) => {
                        const percentage = total
                            ? Math.round((item.count / total) * 100)
                            : 0;

                        return (
                            <div className="breakdown-item" key={item.decision}>
                                <div className="breakdown-row">
                                    <span>{formatDecision(item.decision)}</span>
                                    <strong>
                                        {item.count} / {percentage}%
                                    </strong>
                                </div>

                                <div className="breakdown-bar">
                                    <div
                                        className="breakdown-fill"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}