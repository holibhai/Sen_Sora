// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedTrackRoute = () => {
  const isAdminLoggedIn = !!localStorage.getItem("trackerToken"); // or use context/cookie check

  return isAdminLoggedIn ? <Outlet /> : <Navigate to="/tracker/login" />;
};

export default ProtectedTrackRoute;
