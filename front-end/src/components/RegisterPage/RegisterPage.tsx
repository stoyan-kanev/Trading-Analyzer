import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/useAuth";

import "./RegisterPage.css";

export default function RegisterPage() {
    const navigate = useNavigate();

    const { register } = useAuth();

    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (
        event: React.SyntheticEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const email = formData.get("email")?.toString() ?? "";
        const firstName = formData.get("firstName")?.toString() ?? "";
        const lastName = formData.get("lastName")?.toString() ?? "";
        const password = formData.get("password")?.toString() ?? "";

        setPending(true);
        setError(null);

        try {
            await register({
                email,
                firstName,
                lastName,
                password,
            });

            navigate("/dashboard", {
                replace: true,
            });
        } catch (error) {
            console.error(error);

            setError("Unable to create account.");
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="register-page">
            <form
                className="register-form"
                onSubmit={handleSubmit}
            >
                <h1>Register</h1>

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
                    <label htmlFor="firstName">
                        First Name
                    </label>

                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="John"
                        autoComplete="given-name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">
                        Last Name
                    </label>

                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                        autoComplete="family-name"
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
                        autoComplete="new-password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={pending}
                >
                    {pending
                        ? "Creating Account..."
                        : "Register"}
                </button>

                <p className="auth-switch">
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}