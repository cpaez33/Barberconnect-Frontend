import { Navigate } from "react-router";
import { useAuth } from "./AuthContext";

/**
 * This wraps any route that requires login.
 * If `roles` is passed, user.role must be one of them.
 */
export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading…</p>;
  }
  // not logged in → go to /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  // role-based guard
  if (role && role !== user.role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
