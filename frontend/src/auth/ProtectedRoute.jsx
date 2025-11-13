import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, hydrated } = useAuth();
  const location = useLocation();

  if (!hydrated) {
    return (
      <div style={{
        padding: 24,
        color: "#111",
        fontFamily: "system-ui, sans-serif"
      }}>
        Checking your session…
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
