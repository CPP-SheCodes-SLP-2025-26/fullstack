import { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import AuthButtons from './components/AuthButtons';
import Navbar from './components/NavBar';
import RequireAuth from './components/RequireAuth';
import { supabase } from './lib/supabase';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ChoreList from './pages/ChoreList'
import CreateChore from './pages/CreateChore';
import './App.css';

function Login({ session }) {
  const navigate = useNavigate();
  const location = useLocation();
  // If already logged in, bounce back where they came from or home
  useEffect(() => {
    if (session) {
      const dest = location.state?.from?.pathname ?? '/';
      navigate(dest, { replace: true });
    }
  }, [session, location, navigate]);

  return (
    <div style={{ padding: 20 }}>
        <h2>Sign in</h2>
        <div className = "login-buttons">
          <AuthButtons />
      </div>
    </div>
  );
}
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";

import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Chores from "./pages/Chores";
import Bills from "./pages/Bills";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <Navbar className="navbar" />
      <Routes>
        {/* Public routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chores" element={<Chores />} />
        <Route path="/bills" element={<Bills />} /> 
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ChoreList" element={<ChoreList />} />
        <Route path="/create-chore" element={<CreateChore />} />

        {/* Login route (redirects away if already signed in) */}
        <Route path="/login" element={<Login session={session} />} />

        {/* Protected route(s) */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth session={session}>
              <Dashboard />
            </RequireAuth>
          }
        />

        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
