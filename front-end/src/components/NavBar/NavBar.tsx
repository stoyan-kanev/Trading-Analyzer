import { Link } from "react-router-dom";

import "./NavBar.css";

export default function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link
                    to="/"
                    className="navbar-logo"
                >
                    TradePilot
                </Link>

                <div className="navbar-links">
                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/login">
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="register-btn"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}