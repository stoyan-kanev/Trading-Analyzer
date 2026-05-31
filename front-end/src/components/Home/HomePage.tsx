import { Link } from "react-router-dom";

import "./HomePage.css";

export default function HomePage() {
    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-content">
                    <span className="hero-badge">Trading Setup Analyzer</span>

                    <h1>
                        Analyze your trades before emotion takes over.
                    </h1>

                    <p>
                        TradePilot helps you validate bias, confirmations,
                        liquidity sweeps and risk-to-reward before entering a trade.
                    </p>

                    <div className="hero-actions">
                        <Link to="/register" className="primary-btn">
                            Get Started
                        </Link>

                        <Link to="/login" className="secondary-btn">
                            Login
                        </Link>
                    </div>
                </div>

                <div className="hero-card">
                    <div className="card-header">
                        <span>Setup Result</span>
                        <strong className="trade-status">WAIT</strong>
                    </div>

                    <div className="score-box">
                        <span>Score</span>
                        <strong>6.5 / 10</strong>
                    </div>

                    <ul>
                        <li>Daily and 4H bias aligned</li>
                        <li>Price reacting from valid OB zone</li>
                        <li>Waiting for CHOCH confirmation</li>
                    </ul>
                </div>
            </section>

            <section className="features-section">
                <div className="feature-card">
                    <h3>Bias Validation</h3>
                    <p>
                        Compare higher timeframe direction before considering entries.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>Rule-Based Scoring</h3>
                    <p>
                        Turn your trading rules into a repeatable decision process.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>Trade Journal</h3>
                    <p>
                        Track results, mistakes and patterns from your setups.
                    </p>
                </div>
            </section>
        </div>
    );
}