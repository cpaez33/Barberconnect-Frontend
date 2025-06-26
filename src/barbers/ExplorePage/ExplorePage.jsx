import useQuery from "../../api/useQuery";
import BarbersList from "./BarbersList";
import { useAuth } from "../../auth/AuthContext";
import "./explorepage.css";

export default function ExplorePage() {
  const { user, loading } = useAuth();
  console.log("user", user, loading);
  const {
    data: barbers,
    loading: loadingBarbers,
    error: barbersErr,
  } = useQuery("/barbers", "barbers");

  return (
    <div className="explore-page">
      {/* {--- Search Bar ---} */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for services, barbers…"
          disabled
          className="search-input"
        />
        <button className="search-btn">Search</button>
      </div>
      {/* ——— Barber grid ——— */}
      {barbers && (
        <BarbersList
          barbers={barbers}
          loadingBarbers={loadingBarbers}
          barbersErr={barbersErr}
        />
      )}
    </div>
  );
}
