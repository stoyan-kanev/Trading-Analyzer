import { useState } from "react";
import "./AnalysisPage.css"
type Decision = "TRADE" | "WAIT" | "NO TRADE";

type AnalysisFormData = {
    pair: string;
    dailyBias: string;
    h4Bias: string;
    session: string;
    zoneType: string;
    confirmation: string;
    liquiditySweep: string;
    rr: string;
    notes: string;
};

type AnalysisResult = {
    score: number;
    decision: Decision;
    reasons: string[];
    warnings: string[];
};

const initialFormData: AnalysisFormData = {
    pair: "",
    dailyBias: "",
    h4Bias: "",
    session: "",
    zoneType: "",
    confirmation: "",
    liquiditySweep: "",
    rr: "",
    notes: "",
};

export function AnalysisPage() {
    const [formData, setFormData] = useState<AnalysisFormData>(initialFormData);
    const [result, setResult] = useState<AnalysisResult | null>(null);

    function updateField(
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    }

    function evaluateSetup(): AnalysisResult {
        let score = 0;
        const reasons: string[] = [];
        const warnings: string[] = [];

        if (
            formData.dailyBias === formData.h4Bias &&
            formData.dailyBias !== "" &&
            formData.dailyBias !== "neutral"
        ) {
            score += 2;
            reasons.push("Daily and 4H bias are aligned.");
        } else {
            warnings.push("Daily and 4H bias are not aligned.");
        }

        if (formData.zoneType === "ob" || formData.zoneType === "fvg") {
            score += 2;
            reasons.push("Price is reacting from a valid zone.");
        } else {
            warnings.push("Zone type is weak or missing.");
        }

        if (formData.liquiditySweep === "true") {
            score += 2;
            reasons.push("Liquidity sweep detected.");
        } else {
            warnings.push("No liquidity sweep detected.");
        }

        if (formData.confirmation === "choch" || formData.confirmation === "bos") {
            score += 3;
            reasons.push("Lower timeframe confirmation detected.");
        } else {
            warnings.push("No strong confirmation detected.");
        }

        if (Number(formData.rr) >= 1.5) {
            score += 1;
            reasons.push("Risk-to-reward is acceptable.");
        } else {
            warnings.push("Risk-to-reward is weak.");
        }

        let decision: Decision = "NO TRADE";

        if (score >= 7) {
            decision = "TRADE";
        } else if (score >= 4) {
            decision = "WAIT";
        }

        return {
            score,
            decision,
            reasons,
            warnings,
        };
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const evaluationResult = evaluateSetup();
        setResult(evaluationResult);
    }

    return (
        <main className="analysis-page">
            <section className="analysis-header">
                <div>
                    <p className="analysis-kicker">Setup Evaluation</p>
                    <h1>New Analysis</h1>
                    <p>Enter the trade context and let the analyzer score the setup.</p>
                </div>
            </section>

            <section className={`analysis-layout ${result ? "has-result" : ""}`}>
                <form className="analysis-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <label>
                            Pair
                            <input
                                name="pair"
                                type="text"
                                placeholder="GBP/JPY"
                                value={formData.pair}
                                onChange={updateField}
                            />
                        </label>

                        <label>
                            Daily Bias
                            <select name="dailyBias" value={formData.dailyBias} onChange={updateField}>
                                <option value="">Select bias</option>
                                <option value="bullish">Bullish</option>
                                <option value="bearish">Bearish</option>
                                <option value="neutral">Neutral</option>
                            </select>
                        </label>

                        <label>
                            4H Bias
                            <select name="h4Bias" value={formData.h4Bias} onChange={updateField}>
                                <option value="">Select bias</option>
                                <option value="bullish">Bullish</option>
                                <option value="bearish">Bearish</option>
                                <option value="neutral">Neutral</option>
                            </select>
                        </label>

                        <label>
                            Session
                            <select name="session" value={formData.session} onChange={updateField}>
                                <option value="">Select session</option>
                                <option value="london">London</option>
                                <option value="new_york">New York</option>
                                <option value="asia">Asia</option>
                            </select>
                        </label>

                        <label>
                            Zone Type
                            <select name="zoneType" value={formData.zoneType} onChange={updateField}>
                                <option value="">Select zone</option>
                                <option value="ob">Order Block</option>
                                <option value="fvg">FVG</option>
                                <option value="support_resistance">Support / Resistance</option>
                                <option value="none">None</option>
                            </select>
                        </label>

                        <label>
                            Confirmation
                            <select name="confirmation" value={formData.confirmation} onChange={updateField}>
                                <option value="">Select confirmation</option>
                                <option value="choch">CHOCH</option>
                                <option value="bos">BOS</option>
                                <option value="none">None</option>
                            </select>
                        </label>

                        <label>
                            Liquidity Sweep
                            <select
                                name="liquiditySweep"
                                value={formData.liquiditySweep}
                                onChange={updateField}
                            >
                                <option value="">Select option</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </label>

                        <label>
                            Risk Reward
                            <input
                                name="rr"
                                type="number"
                                step="0.1"
                                placeholder="2.0"
                                value={formData.rr}
                                onChange={updateField}
                            />
                        </label>
                    </div>

                    <label>
                        Notes
                        <textarea
                            name="notes"
                            placeholder="Write your setup context..."
                            value={formData.notes}
                            onChange={updateField}
                        />
                    </label>

                    <div className="form-actions">
                        <button type="submit" className="analysis-primary-btn">
                            Evaluate Setup
                        </button>
                    </div>
                </form>

                {result && (
                    <aside className="analysis-result-card">
                        <p className="result-kicker">Evaluation Result</p>

                        <div className="result-score-row">
                            <span>Score</span>
                            <strong>{result.score}/10</strong>
                        </div>

                        <div className={`decision-badge decision-${result.decision.toLowerCase().replace(" ", "-")}`}>
                            {result.decision}
                        </div>

                        <div className="result-section">
                            <h3>Reasons</h3>
                            <ul>
                                {result.reasons.map((reason) => (
                                    <li key={reason}>✓ {reason}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="result-section">
                            <h3>Warnings</h3>
                            <ul>
                                {result.warnings.map((warning) => (
                                    <li key={warning}>⚠ {warning}</li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                )}
            </section>
        </main>
    );
}