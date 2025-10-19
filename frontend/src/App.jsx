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
      <AuthButtons />
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

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

        {/* Example: quick sign-out route (optional) */}
        <Route
          path="/logout"
          element={
            session
              ? (supabase.auth.signOut(), <Navigate to="/" replace />)
              : <Navigate to="/" replace />
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Signed-in footer snippet (optional) */}
      <div style={{ padding: 20, opacity: 0.7 }}>
        {session
          ? <>Signed in as <strong>{session.user.email}</strong> · <button onClick={() => supabase.auth.signOut()}>Sign out</button></>
          : <>You are not signed in.</>}
      </div>
    </Router>
  );
}
