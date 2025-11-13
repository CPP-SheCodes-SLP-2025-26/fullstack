// frontend/src/pages/JoinPlastics.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./JoinPlastics.css";

import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import user_icon from "../assets/user.png";
import room_icon from "../assets/room.png";

function JoinPlastics({ session }) {
  const navigate = useNavigate();
  const location = useLocation();
  const action = "Join The Plastics!";

  const [form, setForm] = useState({
    name: "",
    room: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // If already logged in (via parent session OR localStorage), bounce away
  useEffect(() => {
    const localSession = (() => {
      try { return JSON.parse(localStorage.getItem("session") || "null"); }
      catch { return null; }
    })();

    if (session || localSession) {
      const dest = location.state?.from?.pathname ?? "/dashboard";
      navigate(dest, { replace: true });
    }
  }, [session, location, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email.";
    if (!form.password || form.password.length < 8) return "Use at least 8 characters.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const v = validate();
    if (v) { setError(v); return; }

    setIsSubmitting(true);
    try {
      // If you're using a Vite proxy, keep "/api/signup".
      // If not, point to your backend URL (e.g., "http://localhost:3001/api/signup")
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Signup failed");

      // ✅ Signup success — save a session so ProtectedRoute lets them in
      localStorage.setItem(
        "session",
        JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          room: form.room.trim(),
        })
      );

      // Go to a protected page
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="jp-auth">
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="inputs">
            <div className="input">
              <img src={user_icon} alt="user" />
              <input
                type="text"
                name="name"
                placeholder="Your Full Fetch Name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            <div className="input">
              <img src={room_icon} alt="room" />
              <input
                type="text"
                name="room"
                placeholder="Your Fetch Room Number"
                value={form.room}
                onChange={handleChange}
              />
            </div>

            <div className="input">
              <img src={email_icon} alt="email" />
              <input
                type="email"
                name="email"
                placeholder="Your Super Secret Email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className="input">
              <img src={password_icon} alt="password" />
              <input
                type="password"
                name="password"
                placeholder={'Your Totally Not "1234" Password'}
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
          </div>

          {error && <p className="error">{error}</p>}

          <div className="submit-container">
            <button className="submit gray" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Joining..." : "Join The Plastics!"}
            </button>
            <div className="submit" onClick={() => navigate("/login")}>
              Get In Loser!
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JoinPlastics;
