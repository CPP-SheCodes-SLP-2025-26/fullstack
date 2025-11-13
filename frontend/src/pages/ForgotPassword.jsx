<<<<<<< HEAD
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

=======
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css"; // reuse the same styles

import email_icon from "../assets/email.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | success | error
  const [msg, setMsg] = useState("");

  const isValidEmail = (v) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(v);

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");

    if (!email.trim()) {
      setState("error");
      setMsg("Enter your email, bestie.");
      return;
    }
    if (!isValidEmail(email)) {
      setState("error");
      setMsg("That doesn’t look like a real email.");
      return;
    }

    try {
      setState("loading");

      // TODO: replace with your backend endpoint
      // const res = await fetch("/api/auth/forgot-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });
      // if (!res.ok) throw new Error("Request failed");

      // Demo: pretend success after a short wait
      await new Promise((r) => setTimeout(r, 900));

      setState("success");
      setMsg(
        "If that email has an account, we sent a reset link. Check your inbox!"
      );
    } catch {
      setState("error");
      setMsg("We couldn’t send it right now. Try again later.");
    }
  }

  return (
    <div className="container forgot-container">
      <div className="header">
        <div className="text">Poor Girl...You Forgot? 🙄 </div>
        <div className="underline"></div>
      </div>

      <form onSubmit={handleSubmit} className="inputs" noValidate>
        <div className="input">
          <img src={email_icon} alt="email" />
          <input
            type="email"
            placeholder="betch@plastics.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="submit-container" style={{ marginTop: 24 }}>
          <button
            type="submit"
            className="submit"
            disabled={state === "loading"}
          >
            {state === "loading" ? "Sending..." : "Email Me a Reset Link"}
          </button>
        </div>

        {!!msg && (
          <p
            style={{
              textAlign: "center",
              fontWeight: 1000,
              color: state === "success" ? "#10b981" : "#000",
            }}
          >
            {msg}
          </p>
        )}

        <p style={{ textAlign: "center" }}>
          <Link className="forgot-link" to="/login">
            ← Bye
          </Link>
        </p>
      </form>
    </div>
  );
}
>>>>>>> 52381747f932a956ad458395b6b05b463d162174
