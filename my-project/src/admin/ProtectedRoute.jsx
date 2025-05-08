// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAdminLoggedIn = !!localStorage.getItem("adminToken"); // or use context/cookie check

  return isAdminLoggedIn ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
