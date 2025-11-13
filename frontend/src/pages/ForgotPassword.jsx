import React, { useState } from 'react';
import { AuthAPI } from '../lib/api';
import './AuthForm.css';


export default function ForgotPassword() {
const [email, setEmail] = useState('');
const [sent, setSent] = useState(false);
const [error, setError] = useState('');


async function handleSubmit(e) {
e.preventDefault();
setError('');
try {
await AuthAPI.forgot(email);
setSent(true);
} catch (err) {
setError(err.message || 'Could not send reset email');
}
}

return (
<div className="container">
<div className="header">
<div className="text">Forgot Your Password?</div>
<div className="underline"></div>
</div>


{!sent ? (
<form className="inputs" onSubmit={handleSubmit}>
<div className="input">
<input
type="email"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
</div>
{error && <div className="error">{error}</div>}
<button className="submit" type="submit">Send Reset Link</button>
</form>
) : (
<div className="success">If that email exists, a reset link was sent. Check your inbox (or server logs in dev).</div>
)}
</div>
);
}

