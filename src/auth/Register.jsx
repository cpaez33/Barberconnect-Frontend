import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "./register.css";
import { useAuth } from "./AuthContext";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [role, setRole] = useState("client");

  const onRegister = async (formData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirm = formData.get("confirmPassword");
    const calendlyLink = formData.get("calendlyLink");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register({ name, email, password, role, calendlyLink });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h1>Create your account</h1>
        <p className="login-prompt">
          Already have an account?
          <Link to="/login" className="login-link">
            Log in
          </Link>
        </p>

        <form action={onRegister} className="register-form">
          {/* Role toggle */}
          <fieldset className="role-toggle">
            <legend className="sr-only">I am a…</legend>
            <label
              className={"toggle-option" + (role === "client" ? " active" : "")}
            >
              <input
                type="radio"
                name="role"
                value="client"
                defaultChecked
                onChange={() => setRole("client")}
              />
              Client
            </label>
            <label
              className={"toggle-option" + (role === "barber" ? " active" : "")}
            >
              <input
                type="radio"
                name="role"
                value="barber"
                onChange={() => setRole("barber")}
              />
              Barber
            </label>
          </fieldset>

          {/* Inputs */}
          <label className="input-label">
            <input
              className="input-field"
              type="text"
              name="name"
              placeholder="Name"
              required
            />
          </label>
          <label className="input-label">
            <input
              className="input-field"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </label>
          <label className="input-label">
            <input
              className="input-field"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </label>
          <label className="input-label">
            <input
              className="input-field"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              required
            />
          </label>

          {role === "barber" && (
            <label className="input-label">
              <input
                className="input-field"
                type="url"
                name="calendlyLink"
                placeholder="https://calendly.com/your-name"
              />
            </label>
          )}

          <button type="submit" className="register-button">
            Sign Up
          </button>

          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
