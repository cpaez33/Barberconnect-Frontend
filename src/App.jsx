import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ExplorePage from "./barbers/ExplorePage/ExplorePage";
import BarberDetail from "./barbers/BarberDetail";
import ProtectedRoute from "./auth/ProtectedRoute";
import ClientDashboard from "./clients/ClientDashboard";
import BarberDashboard from "./barbers/BarberDashboard/BarberDashboard";
import SettingsPage from "./barbers/SettingsPage";
import ServicesPage from "./barbers/ServicesPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ExplorePage />} />
        <Route path="barbers/:barberId" element={<BarberDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route
          path="/services"
          element={
            <ProtectedRoute role="barber">
              <ServicesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute role="barber">
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/barber/dashboard"
          element={
            <ProtectedRoute role="barber">
              <BarberDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/dashboard"
          element={
            <ProtectedRoute role="client">
              <ClientDashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
