import "./AnalysisPage.css"
export function AnalysisPage() {
    return (
        <main className="analysis-page">
            <section className="analysis-header">
                <div>
                    <p className="analysis-kicker">Setup Evaluation</p>
                    <h1>New Analysis</h1>
                    <p>Enter the trade context and let the analyzer score the setup.</p>
                </div>
            </section>

            <form className="analysis-form">
                <div className="form-grid">
                    <label>
                        Pair
                        <input type="text" placeholder="GBP/JPY" />
                    </label>

                    <label>
                        Daily Bias
                        <select>
                            <option value="">Select bias</option>
                            <option value="bullish">Bullish</option>
                            <option value="bearish">Bearish</option>
                            <option value="neutral">Neutral</option>
                        </select>
                    </label>

                    <label>
                        4H Bias
                        <select>
                            <option value="">Select bias</option>
                            <option value="bullish">Bullish</option>
                            <option value="bearish">Bearish</option>
                            <option value="neutral">Neutral</option>
                        </select>
                    </label>

                    <label>
                        Session
                        <select>
                            <option value="">Select session</option>
                            <option value="london">London</option>
                            <option value="new_york">New York</option>
                            <option value="asia">Asia</option>
                        </select>
                    </label>

                    <label>
                        Zone Type
                        <select>
                            <option value="">Select zone</option>
                            <option value="ob">Order Block</option>
                            <option value="fvg">FVG</option>
                            <option value="support_resistance">Support / Resistance</option>
                            <option value="none">None</option>
                        </select>
                    </label>

                    <label>
                        Confirmation
                        <select>
                            <option value="">Select confirmation</option>
                            <option value="choch">CHOCH</option>
                            <option value="bos">BOS</option>
                            <option value="none">None</option>
                        </select>
                    </label>

                    <label>
                        Liquidity Sweep
                        <select>
                            <option value="">Select option</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </label>

                    <label>
                        Risk Reward
                        <input type="number" step="0.1" placeholder="2.0" />
                    </label>
                </div>

                <label>
                    Notes
                    <textarea placeholder="Write your setup context..." />
                </label>

                <div className="form-actions">
                    <button type="submit" className="analysis-primary-btn">
                        Evaluate Setup
                    </button>
                </div>
            </form>
        </main>
    );
}