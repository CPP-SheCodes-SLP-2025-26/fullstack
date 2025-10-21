import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthButtons from '../components/AuthButtons';

export default function Login({ session }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
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