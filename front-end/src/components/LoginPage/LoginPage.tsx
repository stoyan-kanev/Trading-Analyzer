import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/useAuth";

import "./LoginPage.css";

export default function LoginPage() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (
        event: React.SyntheticEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const email = formData.get("email")?.toString() ?? "";
        const password = formData.get("password")?.toString() ?? "";

        setPending(true);
        setError(null);

        try {
            await login(email, password);

            navigate("/dashboard", {
                replace: true,
            });
        } catch (error) {
            console.error(error);

            setError("Invalid email or password.");
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="login-page">
            <form
                className="login-form"
                onSubmit={handleSubmit}
            >
                <h1>Login</h1>

                {error && (
                    <p className="auth-error">
                        {error}
                    </p>
                )}

                <div className="form-group">
                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="user@email.com"
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={pending}
                >
                    {pending
                        ? "Signing In..."
                        : "Sign In"}
                </button>

                <p className="auth-switch">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}