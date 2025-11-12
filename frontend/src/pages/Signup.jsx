import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./JoinPlastics.css";

import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import user_icon from "../assets/user.png";
import room_icon from "../assets/room.png";

export default function JoinPlastics({ session }) {
  const navigate = useNavigate();
  const location = useLocation();
  const action = "Join The Plastics!";

  useEffect(() => {
    if (session) {
      const dest = location.state?.from?.pathname ?? "/";
      navigate(dest, { replace: true });
    }
  }, [session, location, navigate]);

  return (
    <div className="jp-auth">
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="user" />
            <input type="text" placeholder="Your Full Fetch Name" />
          </div>

          <div className="input">
            <img src={room_icon} alt="room" />
            <input type="text" placeholder="Your Fetch Room Number" />
          </div>

          <div className="input">
            <img src={email_icon} alt="email" />
            <input type="email" placeholder="Your Super Secret Email" />
          </div>

          <div className="input">
            <img src={password_icon} alt="password" />
            <input type="password" placeholder={'Your Totally Not "1234" Password'} />
          </div>
        </div>

        <div className="submit-container">
          <div className="submit gray" onClick={() => navigate("/signup")}>
            Join The Plastics!
          </div>
          <div className="submit" onClick={() => navigate("/login")}>
            Get In Loser!
          </div>
        </div>
      </div>
    </div>
  );
}
