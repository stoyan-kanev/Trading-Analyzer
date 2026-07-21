import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import "./TradeLogPage.css";
import type {TradeFormData} from "../../types/tradeTypes.ts";
import {TradeService} from "../../services/tradeServices.ts";

export function TradeLogPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<TradeFormData>({
        analysis: Number(id),
        entry_price: "",
        stop_loss: "",
        take_profit: "",
        result: "win",
        profit_loss_r: "",
        notes: "",
    });

    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!id) {
            setErrorMessage("Missing analysis id.");
            return;
        }

        try {
            setIsSaving(true);
            setErrorMessage(null);

            await TradeService.createTrade({
                ...formData,
                analysis: Number(id),
            });

            navigate(`/analysis/${id}`);
        } catch (err) {
            console.log(err);
            setErrorMessage("Failed to save trade.");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <main className="trade-log-page">
            <section className="trade-log-card">
                <div className="trade-log-header">
                    <p className="dashboard-kicker">Trade Journal</p>
                    <h1>Log Trade</h1>
                    <p>Save the real result for this analysis.</p>
                </div>

                {errorMessage && (
                    <p className="trade-log-error">{errorMessage}</p>
                )}

                <form className="trade-log-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <label>
                            Entry Price
                            <input
                                type="number"
                                step="0.00001"
                                name="entry_price"
                                value={formData.entry_price}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label>
                            Stop Loss
                            <input
                                type="number"
                                step="0.00001"
                                name="stop_loss"
                                value={formData.stop_loss}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label>
                            Take Profit
                            <input
                                type="number"
                                step="0.00001"
                                name="take_profit"
                                value={formData.take_profit}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label>
                            Result
                            <select
                                name="result"
                                value={formData.result}
                                onChange={handleChange}
                                required
                            >
                                <option value="win">Win</option>
                                <option value="loss">Loss</option>
                                <option value="breakeven">Breakeven</option>
                            </select>
                        </label>

                        <label>
                            Profit / Loss R
                            <input
                                type="number"
                                step="0.01"
                                name="profit_loss_r"
                                value={formData.profit_loss_r}
                                onChange={handleChange}
                                placeholder="Example: 1.5 or -1"
                                required
                            />
                        </label>
                    </div>

                    <label>
                        Notes
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="What happened after entry?"
                        />
                    </label>

                    <div className="trade-log-actions">
                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={() => navigate(`/analysis/${id}`)}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="dashboard-primary-btn"
                            disabled={isSaving}
                        >
                            {isSaving ? "Saving..." : "Save Trade"}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}