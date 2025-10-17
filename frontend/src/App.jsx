import { useEffect, useState } from 'react';
import AuthButtons from './components/AuthButtons';
import { supabase } from './lib/supabase';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Sign in</h2>
        <AuthButtons />
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <p>Signed in as <strong>{session.user.email}</strong></p>
      <button onClick={() => supabase.auth.signOut()}>Sign out</button>
    </div>
  );
}
