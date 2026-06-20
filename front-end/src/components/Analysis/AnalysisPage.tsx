import { useState } from "react";
import "./AnalysisPage.css"
import type {AnalysisFormData, AnalysisResult} from "../../types/analysisTypes.ts";
import {AnalysisService} from "../../services/analysisService.ts";


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
    const [isEvaluating, setIsEvaluating] = useState(false);



    function updateField(
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    }



    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            setIsEvaluating(true);
            setResult(null);

            const response = await AnalysisService.evaluateAnalysis(formData);

            setResult(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsEvaluating(false);
        }
    }

    return (
        <main className="analysis-page">
            <section className="analysis-header">
                <p className="analysis-kicker">Setup Evaluation</p>
                <h1>New Analysis</h1>
                <p>Enter the trade context and let the analyzer score the setup.</p>
            </section>

            <section className={`analysis-layout ${result || isEvaluating ? "has-result" : ""}`}>
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
                        <button type="submit" className="analysis-primary-btn" disabled={isEvaluating}>
                            {isEvaluating ? "Evaluating..." : "Evaluate Setup"}
                        </button>
                    </div>
                </form>

                {isEvaluating && (
                    <aside className="analysis-result-card evaluating-card">
                        <div className="loader-ring" />
                        <h2>Analyzing setup...</h2>
                        <p>Checking bias, liquidity, confirmation and risk-to-reward.</p>
                    </aside>
                )}

                {result && !isEvaluating && (
                    <aside className="analysis-result-card">
                        <p className="result-kicker">Evaluation Result</p>

                        <div className="result-score-row">
                            <span>Score</span>
                            <strong>{result.score}/10</strong>
                        </div>

                        <div className="score-progress">
                            <div
                                className="score-progress-fill"
                                style={{ width: `${result.score * 10}%` }}
                            />
                        </div>

                        <div
                            className={`decision-badge decision-${result.decision
                                .toLowerCase()
                                .replace(" ", "-")}`}
                        >
                            {result.decision}
                        </div>

                        <div className="result-section">
                            <h3>Reasons</h3>

                            <div className="result-items">
                                {result.reasons.map((reason) => (
                                    <div className="result-item success" key={reason}>
                                        <span>✓</span>
                                        <p>{reason}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="result-section">
                            <h3>Warnings</h3>

                            <div className="result-items">
                                {result.warnings.map((warning) => (
                                    <div className="result-item warning" key={warning}>
                                        <span>!</span>
                                        <p>{warning}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                )}
            </section>
        </main>
    );
}