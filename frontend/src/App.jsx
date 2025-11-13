import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";                   // public
import JoinPlastics from "./pages/JoinPlastics";   // your signup/login page (optional public)
import Dashboard from "./pages/Dashboard";         // protected
import Profile from "./pages/Profile";             // protected
import Bills from "./components/Bills/Bills.jsx";  // protected (example)
import ProtectedRoute from "./components/RequireAuth.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />

        {/* If you want login/signup to be public too, keep these two lines. 
            If you truly want ONLY "/" public, delete these lines. */}
        <Route path="/signup" element={<JoinPlastics />} />
        <Route path="/login" element={<JoinPlastics />} />

        {/* PROTECTED — everything inside needs session */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bills" element={<Bills />} />
          {/* add any other private routes here */}
          {/* Optional: catch-all for unknown routes when logged in */}
          {/* <Route path="*" element={<Navigate to="/dashboard" replace />} /> */}
        </Route>

        {/* Optional: catch-all for unknown routes when NOT logged in */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
