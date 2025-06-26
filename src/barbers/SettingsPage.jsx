import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router";
import { useState } from "react";
import "./settingspage.css";

export default function SettingsPage() {
  const [urlText, setUrlText] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    mutate: updateUserCalendlyLink,
    loading,
    error,
  } = useMutation("PUT", `/users/client/calendly`, [`barbers-info${user.id}`]);

  const handleUpdate = () => {
    updateUserCalendlyLink({ calendlyLink: urlText });
    if (!error) {
      setUrlText("");
      setSuccess(true);
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="top-section">
          <h1 className="settings-title">Settings</h1>
          <button className="settings-goback" onClick={() => navigate(-1)}>
            Go back
          </button>
        </div>
        <div className="settings-card">
          <h2 className="settings-section-title">Booking Configuration</h2>
          <p className="settings-description">
            Connect your booking calendar by pasting your Calendly URL below to
            sync your availability and manage event types directly from
            BarberConnect.
          </p>
          <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
            <div className="settings-form-group">
              <label htmlFor="calendly-url">Calendly URL</label>
              <input
                id="calendly-url"
                type="url"
                name="url"
                placeholder="e.g., https://calendly.com/your-username"
                className="settings-input"
                value={urlText}
                onChange={(e) => setUrlText(e.target.value)}
                required
              />
            </div>
            <button
              type="button"
              className="settings-btn-save"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Calendly URL"}
            </button>
          </form>
        </div>
        {success && (
          <p className="settings-msg success">
            Calendly link update successful!
          </p>
        )}
        {error && (
          <p className="settings-msg error">
            Something went wrong! Please try again later.
          </p>
        )}
      </div>
    </div>
  );
}
