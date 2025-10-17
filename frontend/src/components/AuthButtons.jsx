import { supabase } from '../lib/supabase';

export default function AuthButtons() {
  const signInWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: 'http://localhost:5173' }
    });
    if (error) alert(error.message);
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'http://localhost:5173' }
    });
    if (error) alert(error.message);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '250px',
      marginTop: '1rem'
    }}>
      <button onClick={signInWithGitHub}>Continue with GitHub</button>
      <button onClick={signInWithGoogle}>Continue with Google</button>
    </div>
  );
}
