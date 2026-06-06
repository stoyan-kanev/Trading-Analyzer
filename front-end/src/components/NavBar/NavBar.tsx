import { Link } from "react-router-dom";

import "./NavBar.css";
import {useAuth} from "../../context/useAuth.tsx";

export default function NavBar() {


    const { user, logout } = useAuth();


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

                    {user && (
                        <>
                            <button onClick={logout}>
                                Logout
                            </button>
                        </>
                    )}
                    {!user && (
                        <>
                            <Link to="/login">
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="register-btn"
                            >
                                Get Started
                            </Link>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
}