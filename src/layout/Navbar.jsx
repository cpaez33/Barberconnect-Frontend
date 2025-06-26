import { NavLink } from "react-router";

import { useAuth } from "../auth/AuthContext";
import BarberConnectImage from "../../assets/BarberConnect-logo.png";
import "../layout/layout.css";

export default function Navbar() {
  const { token, logout, user } = useAuth();
  return (
    <header id="navbar">
      <NavLink id="brand" to="/">
        <img src={BarberConnectImage} alt="Logo" className="logo" />
        <p className="brand-text">BarberConnect</p>
      </NavLink>
      <NavLink className="nav-item explore" to="/explore">
        Explore
      </NavLink>
      <nav className="main-nav">
        {token ? (
          <>
            <NavLink
              className="nav-item"
              to={
                user?.role === "client"
                  ? "/client/dashboard"
                  : "/barber/dashboard"
              }
            >
              Profile
            </NavLink>
            <button className="nav-cta" onClick={logout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <NavLink className="nav-cta" to="/register">
              Sign up
            </NavLink>
            <NavLink className="nav-cta" to="/login">
              Log in
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
