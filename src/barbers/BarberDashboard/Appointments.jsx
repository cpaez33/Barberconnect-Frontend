import { format } from "date-fns";
import { CalendarClock } from "lucide-react";
import { X } from "lucide-react";

export default function Appointments({
  clientName,
  serviceName,
  appointmentTime,
  status,
  cancellationUrl,
  rescheduleUrl,
}) {
  return (
    <li className="bd-card">
      <div className="bd-card-left">
        <img
          src={"/assets/clients/1.png"}
          alt={clientName}
          className="bd-avatar"
        />
        <div className="bd-details">
          <p className="bd-service-title">
            {serviceName} with {clientName}
          </p>
          <p className="bd-date">
            {format(new Date(appointmentTime), "EEEE, MMM d, h:mm a")}
          </p>
        </div>
        <span
          className={`bd-status bd-status--${serviceName
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          {serviceName}
        </span>
        <span className={`bd-status ${status.toLowerCase()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <div className="bd-actions">
        <div className="bd-action">
          {/* (Maybe a Stretch goal) Reschedule / Cancel buttons could go here */}
          <a className="bd-action" href={rescheduleUrl} target={"_blank"}>
            <span className="bd-action-icon">
              <CalendarClock size={20} />
            </span>
            <span>Reschedule</span>
          </a>
        </div>
        <div>
          <a className="bd-action" href={cancellationUrl} target={"_blank"}>
            <span className="bd-action-icon">
              <X />
            </span>
            Cancel
          </a>
        </div>
      </div>
    </li>
  );
}
