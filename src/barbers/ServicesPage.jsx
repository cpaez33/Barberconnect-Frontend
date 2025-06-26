import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { API } from "../api/ApiContext";
import { CircleAlert } from "lucide-react";
import { Trash2 } from "lucide-react";
import "./servicespage.css";

const Service = ({ id, name, price_cents, calendly_event_type }) => {
  const {
    mutate: deleteService,
    loading: deleteServiceLoading,
    error: deleteServiceError,
  } = useMutation("DELETE", `/services/${id}`, ["barber-services-info"]);

  return (
    <li key={id} className="sp-item">
      <div className="sp-info">
        <h3 className="sp-name">{name}</h3>
        <p className="sp-price">${price_cents}</p>
        <a href={calendly_event_type} className="sp-link">
          View on Calendly
        </a>
      </div>
      <button className="sp-delete" onClick={async () => await deleteService()}>
        <Trash2 />
      </button>
    </li>
  );
};

export default function ServicesPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  //   console.log("user", user);
  const [tokenLoading, setTokenLoading] = useState(false);
  const [selectedEventUri, setSelectedEventUri] = useState("");
  const [isBarberCalendlyVerified, setIsBarberCalendlyVerified] =
    useState(null);
  const [calendlyLoginLoading, setCalendlyLoginLoading] = useState(false);

  const {
    data: eventTypes,
    loading: eventTypesLoading,
    error: eventTypesError,
  } = useQuery("/calendly/event_types", "calendly-event-types");

  const {
    data: services,
    loading: loadingServices,
    error: errServices,
  } = useQuery(`/barbers/${user.id}/services`, `barber-services-info`);

  const {
    mutate: createService,
    loading: createSrcLoading,
    error: createSrcError,
  } = useMutation("POST", `/services`, [`barber-services-info`]);

  const handleServiceSubmit = async (formData) => {
    const name = formData.get("name");
    const priceCents = formData.get("price");
    const calendlyEventType = formData.get("url");
    const calendlyEventUri = formData.get("calendlyEventUri");
    try {
      await createService({
        name,
        priceCents,
        calendlyEventType,
        calendlyEventUri,
      });
    } catch (e) {
      console.error(e.message);
    }
  };
  // check Calendly connect
  useEffect(() => {
    if (!user) return;

    setTokenLoading(true);
    const fetchUserRefreshToken = async () => {
      try {
        const res = await fetch(`${API}/barbers/calendlyverify`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed fetching user refresh token");
        const userCalendlyVerifiyData = await res.json();
        setIsBarberCalendlyVerified(userCalendlyVerifiyData);
      } catch (err) {
        console.error(err);
      } finally {
        setTokenLoading(false);
      }
    };
    fetchUserRefreshToken();
  }, [user]);

  const handleCalendlyLogin = async () => {
    setCalendlyLoginLoading(true);
    try {
      window.location.href = `${API}/calendly/connect?userId=${user.id}`;
    } catch (err) {
      console.error(err);
    } finally {
      setCalendlyLoginLoading(false);
    }
  };

  return (
    <>
      <div className="sp-container">
        {!isBarberCalendlyVerified?.verify && (
          <div className="sp-alert">
            <span className="sp-icon">
              <CircleAlert />
            </span>
            <p className="sp-alert-text">
              You need to connect with Calendly before creating services.
            </p>
            <button
              className="sp-btn-connect"
              onClick={handleCalendlyLogin}
              disabled={calendlyLoginLoading}
            >
              {calendlyLoginLoading ? "Connecting…" : "Connect with Calendly"}
            </button>
          </div>
        )}
        <div className="sp-top">
          <h1 className="sp-title">Services</h1>
          <button className="settings-goback" onClick={() => navigate(-1)}>
            Go back
          </button>
        </div>
        <div className="sp-card">
          <h2 className="sp-card-heading">Create a service</h2>
          <form action={handleServiceSubmit} className="sp-form">
            <div className="sp-group">
              <label htmlFor="name">Service name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Haircut"
              />
            </div>
            <div className="sp-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="$ e.g. 25"
              />
            </div>
            <div className="sp-group">
              <label htmlFor="url">Calendly event type URL</label>
              <input
                type="url"
                id="url"
                name="url"
                placeholder="e.g. https://calendly.com/yourname/30min"
              />
            </div>
            <div className="sp-group">
              <label htmlFor="eventType">Select event URI</label>
              <select
                className="sp-select"
                name="calendlyEventUri"
                id="eventType"
                onChange={(e) => {
                  if (e.target.value === "Select event uri") {
                    setSelectedEventUri("");
                  } else {
                    setSelectedEventUri(e.target.value);
                  }
                }}
              >
                <option>Select event uri</option>
                {eventTypes?.map((eventType) => (
                  <option key={eventType.uri} value={eventType.uri}>
                    {eventType.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="sp-btn-create">
              Create service
            </button>
          </form>
        </div>
        <h2 className="sp-title">Your Services</h2>
        {services?.length > 0 ? (
          <ul className="sp-list">
            {services.map((s) => (
              <Service
                key={s.id}
                id={s.id}
                calendly_event_type={s.calendly_event_type}
                name={s.name}
                price_cents={s.price_cents}
              />
            ))}
          </ul>
        ) : (
          <p className="sp-none">You have no services.</p>
        )}
      </div>
    </>
  );
}
