import type { SessionPerformanceItem } from "../../types/analysisTypes.ts";
import { formatSession } from "../../helpers/formatSession.tsx";

type SessionPerformanceProps = {
    data: SessionPerformanceItem[];
};

export function SessionPerformance({ data }: SessionPerformanceProps) {
    const total = data.reduce((sum, item) => sum + item.count, 0);

    return (
        <div className="dashboard-card">
            <h2>Session Performance</h2>

            {data.length === 0 || total === 0 ? (
                <p className="muted">No session data yet.</p>
            ) : (
                <div className="breakdown-list">
                    {data.map((item) => {
                        const percentage = total
                            ? Math.round((item.count / total) * 100)
                            : 0;

                        return (
                            <div className="breakdown-item" key={item.session}>
                                <div className="breakdown-row">
                                    <span>{formatSession(item.session)}</span>
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