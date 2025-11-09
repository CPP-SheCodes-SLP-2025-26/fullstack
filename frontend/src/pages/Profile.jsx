import { useEffect, useState } from "react";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [username, setUsername] = useState("usernameExample");
  const [email, setEmail] = useState("email@example.com");
  const [passwordMasked] = useState("********");

  const [editing, setEditing] = useState(null); // 'username' | 'email' | 'password' | null

  const onChangePic = () => alert("Open file picker to change picture");

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1 className="profile-title">She doesn’t even go here!</h1>

        <div className="lips lips--tl" aria-hidden="true">💋</div>

        <div className="profile-left">
          <button className="avatar" onClick={onChangePic} aria-label="Change profile picture">
            <span className="avatar__cta">change pic</span>
          </button>
          <p className="greeting">Hi, {username}!</p>
        </div>

        <div className="profile-right">
          <InfoRow label="Username" value={username} onEdit={() => setEditing("username")} />
          <InfoRow label="Email" value={email} onEdit={() => setEditing("email")} />
          <InfoRow label="Password" value={passwordMasked} onEdit={() => setEditing("password")} />
        </div>

        <div className="lips lips--br" aria-hidden="true">💋</div>
      </div>

      {/* Overlays */}
      {editing === "username" && (
        <Modal title="Change your name." onClose={() => setEditing(null)}>
          <UsernameForm
            current={username}
            onCancel={() => setEditing(null)}
            onSave={(val) => { setUsername(val); setEditing(null); }}
          />
        </Modal>
      )}
      {editing === "email" && (
        <Modal title="Change your email." onClose={() => setEditing(null)}>
          <EmailForm
            current={email}
            onCancel={() => setEditing(null)}
            onSave={(val) => { setEmail(val); setEditing(null); }}
          />
        </Modal>
      )}
      {editing === "password" && (
        <Modal title="Change your password." onClose={() => setEditing(null)}>
          <PasswordForm
            onCancel={() => setEditing(null)}
            onSave={() => { /* call API here */ setEditing(null); }}
          />
        </Modal>
      )}
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

/* ---------- Modal + Forms ---------- */

function Modal({ title, children, onClose }) {
  // close on Esc or backdrop click
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="overlay" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <div className="popup" onMouseDown={(e) => e.stopPropagation()}>
        <div className="popup-title">{title}</div>
        {children}
      </div>
    </div>
  );
}

function FieldBlock({ label, children, error }) {
  return (
    <div className="field-block">
      <div className="field-label">{label}</div>
      {children}
      <div className="field-error" aria-live="polite">{error || ""}</div>
    </div>
  );
}

function Actions({ canSave, onCancel }) {
  return (
    <div className="popup-actions">
      <button type="button" className="btn ghost" onClick={onCancel}>Cancel</button>
      <button type="submit" className="btn solid" disabled={!canSave}>Save</button>
    </div>
  );
}

/* ---------- Forms with live validation ---------- */

function UsernameForm({ current, onSave, onCancel }) {
  const [v, setV] = useState(current);
  const [c, setC] = useState(current);
  const [touched, setTouched] = useState({ v: false, c: false });

  const sameOk = v === c;
  const nonEmpty = !!v.trim();

  const vErr = touched.v && !nonEmpty ? "Name cannot be empty." : "";
  const cErr = touched.c && !sameOk ? "Names do not match." : "";

  const canSave = nonEmpty && sameOk;

  return (
    <form
      className="popup-form"
      onSubmit={(e) => { e.preventDefault(); if (canSave) onSave(v.trim()); }}
    >
      <FieldBlock label="Enter your new name." error={vErr}>
        <input
          className="popup-input"
          style={{ color: "var(--text)" }}
          value={v}
          onChange={(e) => setV(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, v: true }))}
        />
      </FieldBlock>

      <FieldBlock label="Confirm your new name." error={cErr}>
        <input
          className="popup-input"
          style={{ color: "var(--text)" }}
          value={c}
          onChange={(e) => setC(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, c: true }))}
        />
      </FieldBlock>

      <Actions canSave={canSave} onCancel={onCancel} />
    </form>
  );
}

function EmailForm({ current, onSave, onCancel }) {
  const [v, setV] = useState(current);
  const [c, setC] = useState(current);
  const [touched, setTouched] = useState({ v: false, c: false });

  const emailRegex = /^\S+@\S+\.\S+$/;
  const emailOk = emailRegex.test(v);
  const matchOk = v === c;

  const vErr = touched.v && v && !emailOk ? "Please enter a valid email address." : "";
  const cErr = touched.c && c && !matchOk ? "Emails do not match." : "";

  const canSave = emailOk && matchOk;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSave) return;
    onSave(v.trim());
  };

  return (
    <form className="popup-form" onSubmit={handleSubmit}>
      <FieldBlock label="Enter your new email." error={vErr}>
        <input
          className="popup-input"
          style={{ color: "var(--text)" }}
          type="email"
          value={v}
          onChange={(e) => setV(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, v: true }))}
        />
      </FieldBlock>

      <FieldBlock label="Confirm your new email." error={cErr}>
        <input
          className="popup-input"
          style={{ color: "var(--text)" }}
          type="email"
          value={c}
          onChange={(e) => setC(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, c: true }))}
        />
      </FieldBlock>

      <Actions canSave={canSave} onCancel={onCancel} />
    </form>
  );
}

function PasswordForm({ onSave, onCancel }) {
  const [oldP, setOldP] = useState("");
  const [newP, setNewP] = useState("");
  const [conf, setConf] = useState("");
  const [touched, setTouched] = useState({ old: false, np: false, cf: false });

  const lenOk = newP.length >= 8;
  const matchOk = newP === conf;

  const oldErr = touched.old && !oldP ? "Please enter your old password." : "";
  const npErr  = touched.np && newP && !lenOk ? "Password must be at least 8 characters." : "";
  const cfErr  = touched.cf && conf && !matchOk ? "New passwords do not match." : "";

  const canSave = !!oldP && lenOk && matchOk;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSave) return;
    onSave({ oldP, newP });
  };

  return (
    <form className="popup-form" onSubmit={handleSubmit}>
      <FieldBlock label="Enter your old password." error={oldErr}>
        <input
          className="popup-input"
          style={{ color: "var(--text)" }}
          type="password"
          value={oldP}
          onChange={(e) => setOldP(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, old: true }))}
        />
      </FieldBlock>

      <FieldBlock label="Enter your new password." error={npErr}>
        <input
          className="popup-input"
          style={{ color: "var(--text)" }}
          type="password"
          value={newP}
          onChange={(e) => setNewP(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, np: true }))}
        />
      </FieldBlock>

      <FieldBlock label="Confirm your new password." error={cfErr}>
        <input
          className="popup-input"
          style={{ color: "var(--text)" }}
          type="password"
          value={conf}
          onChange={(e) => setConf(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, cf: true }))}
        />
      </FieldBlock>

      <Actions canSave={canSave} onCancel={onCancel} />
    </form>
  );
}
