import { useState } from "react";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [username, setUsername] = useState("usernameExample");
  const [email, setEmail] = useState("email@example.com");
  const [passwordMasked] = useState("********");

  const onChangePic = () => {
    alert("Open file picker to change picture");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1 className="profile-title">She doesn’t even go here!</h1>

        <div className="lips lips--tl" aria-hidden="true">💋</div>

        <div className="profile-left">
          <button
            className="avatar"
            onClick={onChangePic}
            aria-label="Change profile picture"
          >
            <span className="avatar__cta">change pic</span>
          </button>
          <p className="greeting">Hi, {username}!</p>
        </div>

        <div className="profile-right">
          <InfoRow
            label="Username"
            value={username}
            onEdit={() =>
              setUsername(prompt("New username:", username) || username)
            }
          />
          <InfoRow
            label="Email"
            value={email}
            onEdit={() => setEmail(prompt("New email:", email) || email)}
          />
          <InfoRow
            label="Password"
            value={passwordMasked}
            onEdit={() => alert("Route to change-password flow")}
          />
          <div className="lips lips--br" aria-hidden="true">💋</div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, onEdit }) {
  return (
    <div className="info-row">
      <div className="info-box">
        <span className="info-label">{label}:</span>{" "}
        <span className="info-value">{value}</span>
      </div>
      <button className="edit-btn" onClick={onEdit} aria-label={`Edit ${label}`}>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34a1.25 1.25 0 0 0 0-1.77l-2.98-2.98a1.25 1.25 0 0 0-1.77 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
        </svg>
      </button>
    </div>
  );
}