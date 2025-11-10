import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

// Use paths relative to /src/pages → /src/assets
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import user_icon from "../assets/user.png";

export default function Login({ session }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [action, setAction] = useState("Get In Loser!");

  // Redirect if already logged in
  useEffect(() => {
    if (session) {
      const dest = location.state?.from?.pathname ?? "/";
      navigate(dest, { replace: true });
    }
  }, [session, location, navigate]);

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {/* Name (Sign Up only) */}
        {action === "Get In Loser!" ? null : (
          <div className="input">
            <img src={user_icon} alt="user" />
            <input type="text" placeholder="Your Full Fetch Name" />
          </div>
        )}

        {/* Email */}
        <div className="input">
          <img src={email_icon} alt="email" />
          <input type="email" placeholder="Your Super Secret Email ID" />
        </div>

        {/* Password */}
        <div className="input">
          <img src={password_icon} alt="password" />
          <input
            type="password"
            placeholder={'Your Totally Not "1234" Password'}
          />
        </div>
      </div>

      {/* Forgot password (hide on Sign Up) */}
      {action === "Join The Plastics!" ? null : (
        <div className="forgot-password">
          Forgot Your Password? Ugh Same. <span>Click Here, Loser!</span>
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === "Join The Plastics!" ? "submit gray" : "submit"}
          onClick={() => setAction("Join The Plastics!")}
        >
          Join The Plastics!
        </div>
        <div
          className={action === "Get In Loser!" ? "submit gray" : "submit"}
          onClick={() => setAction("Get In Loser!")}
        >
          Get In Loser!
        </div>
      </div>
    </div>
  );
}
