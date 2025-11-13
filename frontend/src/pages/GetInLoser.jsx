import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./GetInLoser.css";

import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

export default function GetInLoser({ session }) {
  const navigate = useNavigate();
  const location = useLocation();
  const action = "Get In Loser!";

  useEffect(() => {
    if (session) {
      const dest = location.state?.from?.pathname ?? "/";
      navigate(dest, { replace: true });
    }
  }, [session, location, navigate]);

  return (
    <div className="gil-auth">
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="email" />
            <input type="email" placeholder="Your Super Secret Email ID" />
          </div>

          <div className="input">
            <img src={password_icon} alt="password" />
            <input type="password" placeholder={'Your Totally Not "1234" Password'} />
          </div>
        </div>

        <div className="forgot-password">
          Forgot Your Password? Ugh Same. <span>Click Here, Loser!</span>
        </div>

        <div className="submit-container">
          <div className="submit" onClick={() => navigate("/signup")}>
            Join The Plastics!
          </div>
          <div className="submit gray" onClick={() => navigate("/login")}>
            Get In Loser!
          </div>
        </div>
      </div>
    </div>
  );
}
