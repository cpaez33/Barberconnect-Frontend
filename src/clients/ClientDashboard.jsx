import { format } from "date-fns";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router";
import { Calendar } from "lucide-react";
import { Ban } from "lucide-react";
import useQuery from "../api/useQuery";
import "./clientdashboard.css";

export default function ClientDashboard() {
  const { user } = useAuth();
  const {
    data: appts = [],
    loading,
    error,
  } = useQuery(`/clients/${user.id}/appointments`, "client-appointments");

  const bookedAppts = appts.filter((appt) => appt.status === "booked");

  if (loading) return <p>Loading your appointments…</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="client-dashboard">
      {/* Hero Banner */}
      <div className="cd-hero">
        <h1>Welcome back, {user.name}!</h1>
      </div>
      {/* Content Card */}
      <div className="cd-content">
        {/* Only “Upcoming” tab */}
        <div className="cd-tabs">
          <span className="cd-tab active">Upcoming</span>
        </div>
        {/* Appointment List */}
        <ul className="cd-list">
          {bookedAppts.length > 0 ? (
            bookedAppts.map((appt) => (
              <li className="cd-item" key={appt.id}>
                {/* Left: meta info */}
                <div className="cd-item-info">
                  <p className="cd-item-time">
                    {format(
                      new Date(appt.appointment_dt),
                      "MMM d, yyyy, h:mm a"
                    )}
                  </p>
                  <p className="cd-item-text">
                    {appt.service.name} with {appt.otheruser.name}
                  </p>
                </div>
                {/* Avatar */}
                <Link to={`/barbers/${appt.otheruser.id}`}>
                  <img
                    src={`/assets/barbers/${appt.otheruser.id}.png`}
                    alt={appt.otheruser.name}
                    className="cd-avatar"
                  />
                </Link>
                {/* Calendar icon */}
                <div className="cd-icon-section">
                  <a href={appt.reschedule_url} target="_blank">
                    <span className="cd-icon">
                      <Calendar size={23} />
                    </span>
                  </a>
                  <a href={appt.cancellation_url} target="_blank">
                    <Ban color="red" size={23} />
                  </a>
                </div>
              </li>
            ))
          ) : (
            <li className="cd-empty">You have no upcoming appointments.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
