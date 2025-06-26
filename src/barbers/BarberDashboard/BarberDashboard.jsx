import { useAuth } from "../../auth/AuthContext";
import { Link } from "react-router";
import "./barberdashboard.css";
import useQuery from "../../api/useQuery";
import Appointments from "./appointments";

export default function BarberDashboard() {
  const { user } = useAuth();

  const {
    data: appts = [],
    loading,
    error,
  } = useQuery(`/barbers/${user.id}/appointments`, "barber-appointments");

  if (loading) return <p>Loading your bookings…</p>;
  if (error) return <p>Error: {error}</p>;

  const bookedAppts = appts.filter((appt) => appt.status === "booked");

  return (
    <div className="bd-center-box">
      <div className="bd-container">
        {/* Header */}
        <div className="bd-header">
          <h1 className="bd-title">Welcome back, {user.name}!</h1>
          <div className="bd-header-actions">
            <Link to="/settings" className="bd-button">
              Settings
            </Link>
            <Link to="/services" className="bd-button">
              Services
            </Link>
          </div>
        </div>
        <h2 className="bd-subtitle">Upcoming Bookings</h2>
        {/* Appointment List */}
        {bookedAppts.length > 0 ? (
          <ul className="bd-list">
            {bookedAppts.map((appt) => (
              <Appointments
                key={appt.id}
                id={appt.id}
                appointmentTime={appt.appointment_dt}
                clientName={appt.otheruser.name}
                serviceName={appt.service.name}
                status={appt.status}
                cancellationUrl={appt.cancellation_url}
                rescheduleUrl={appt.reschedule_url}
              />
            ))}
          </ul>
        ) : (
          <p className="bd-empty">You have no upcoming bookings.</p>
        )}
      </div>
    </div>
  );
}
