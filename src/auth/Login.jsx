import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "./login.css";
import { useAuth } from "./AuthContext";

/** A form that allows users to log into an existing account. */
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onLogin = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await login({ email, password });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>Welcome back</h1>
        <h3>Log in to your account.</h3>

        <form action={onLogin} className="login-form">
          <label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </label>

          <button type="submit" className="login-button">
            Log in
          </button>

          {error && <div className="error">{error}</div>}
        </form>

        <a href="#" onClick={(e) => e.preventDefault()} className="forgot-link">
          Forgot your password?
        </a>

        <p className="signup-text">
          Don’t have an account?{" "}
          <Link to="/register" className="signup-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
