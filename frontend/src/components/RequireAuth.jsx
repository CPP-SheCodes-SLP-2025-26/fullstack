import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const session = JSON.parse(localStorage.getItem("session") || "null");
  const location = useLocation();

  if (!session) {
    // not logged in → send to home. Keep where they tried to go so you can navigate back later
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
