import { Link } from "react-router";
import { useAuth } from "../../auth/AuthContext";

export default function BarbersList({ barbers, loadingBarbers, barbersErr }) {
  const { user } = useAuth();
  if (loadingBarbers || !barbers) return <p>Loading...</p>;
  if (barbersErr) return <p>Sorry! {barbersErr}</p>;

  return (
    <div className="barber-grid">
      {barbers?.map((barber) => {
        const imgUrl = `/assets/barbers/${barber.id}.png`;

        return (
          <div key={barber.id} className="barber-card">
            <div className="barber-image-wrapper">
              <img
                className="barber-image"
                src={imgUrl}
                alt={`${barber.name} picture`}
              />
            </div>

            <div className="barber-card-content">
              <h3 className="barber-name">{barber.name}</h3>
              <p className="barber-services">
                Services: {barber.services.map((s) => s.name).join(", ")}
              </p>
              <Link to={user ? `/barbers/${barber.id}` : "/login"}>
                <button className="view-profile-btn">View Profile</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
