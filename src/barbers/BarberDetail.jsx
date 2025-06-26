import { useState } from "react";
import { useParams } from "react-router";
import useQuery from "../api/useQuery";
import { InlineWidget } from "react-calendly";
import "./barberdetail.css";

export default function BarberDetail() {
  const { barberId } = useParams();
  const [selectedService, setSelectedService] = useState("");
  const {
    data: barber,
    loading,
    error,
  } = useQuery(`/barbers/${barberId}`, `barbers-info${barberId}`);

  if (loading) return <p>Loading barber</p>;
  if (error) return <p>Oops: {error}</p>;
  if (!barber) return <p>Not found.</p>;

  return (
    <div className="barber-detail-page">
      {/* Sidebar */}
      <aside className="sidebar-card">
        <div className="image-wrapper">
          <img
            className="image"
            src={`assets/profile${barber.id}.png`}
            alt={barber.name}
          />
        </div>
        <h2>{barber.name}</h2>
        <p className="barber-role">Barber</p>
        <hr />
        <div>
          <h3 className="services-title">Services</h3>
          <ul className="services-list">
            {barber.services.map((service) => (
              <li key={service.id} className="service-item">
                <div className="service-info">
                  <span className="service-name">{service.name}</span>
                </div>
                <span className="service-price">
                  ${service.price_cents.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {/* Main Booking Area */}
      <section className="booking-section">
        <div className="booking-card">
          <h2 className="booking-title">Book with {barber.name}</h2>
          <div className="booking-form-group">
            <label htmlFor="service">Select Service</label>
            <select
              id="service"
              onChange={(e) => {
                if (e.target.value === "Select service") {
                  setSelectedService("");
                } else {
                  setSelectedService(e.target.value);
                }
              }}
            >
              <option>Select service</option>
              {barber.services.map((service) => (
                <option key={service.id} value={service.calendly_event_type}>
                  {service.name} — ${service.price_cents.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
          <div className="booking-form-group">
            {selectedService && <h3>Select Date & Time</h3>}
            {selectedService && (
              <>
                <div className="calendar-container">
                  <InlineWidget
                    url={selectedService}
                    pageSettings={{
                      backgroundColor: "364153",
                      primaryColor: "FFC107",
                      textColor: "FFFFFF",
                    }}
                    styles={{
                      maxHeight: "500px",
                      width: "100%",
                    }}
                  />
                </div>
                <a
                  className="calendar-fallback"
                  href={selectedService}
                  target="_blank"
                  rel="noreferrer"
                >
                  If the calendar doesn’t load, open in full page.
                </a>
              </>
            )}
          </div>
          {selectedService && (
            <div className="summary">
              <h3>Summary</h3>
              <div className="summary-item">
                <span>Service </span>
                <span>$30</span>
              </div>
              <div className="summary-item">
                <span>Service Fee </span>
                <span>$2</span>
              </div>
              <div className="summary-total">
                <span>Total </span>
                <span>$32</span>
              </div>
              <button className="btn-book">Book now</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
