import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar";

import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chores from "./pages/Chores";
import Bills from "./pages/Bills";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

export default function App() {

  const [session, setSession] = useState(false); // added state here
  const [userId, setUserId] = useState(null);

  return (
    <Router>
      {/* Navbar sees auth state */}
      <Navbar
        session={session}
        userId={userId}
        setSession={setSession}
        setUserId={setUserId}
      />

    <Routes>
      <Route path="/" element={<Home />} />

      {/* Public-ish routes (you can lock them later if you want) */}
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard userId={userId} />} />
      <Route path="/calendar" element={<Calendar userId={userId} />} />
      <Route path="/profile" element={<Profile userId={userId} />} />
      <Route path="/chores" element={<Chores userId={userId} />} />
      <Route path="/bills" element={<Bills userId={userId} />} />

        {/* Login route */}
        <Route
          path="/login"
          element={
            session ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login
                session={session}
                setSession={setSession}
                setUserId={setUserId}   // so Login can save userId
              />
            )
          }
        />

        <Route
          path="/signup"
          element={
            <Signup
              session={session}
              setSession={setSession}
              setUserId={setUserId}     // so Signup can save userId
            />
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
