import { useEffect, useState, useRef} from "react";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [username, setUsername] = useState("usernameExample");
  const [email, setEmail] = useState("email@example.com");
  const [passwordMasked] = useState("********");
  const [editing, setEditing] = useState(null); // 'username' | 'email' | 'password' | 'pic' | null

  // optional local preview for the avatar
  const [avatarSrc, setAvatarSrc] = useState(null);

  const onChangePic = () => setEditing("pic");

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1 className="profile-title">She Doesn’t Even Go Here!</h1>

        <div className="lips lips--tl" aria-hidden="true">💋</div>

        <div className="profile-left">
          <button
			className="avatar"
			onClick={onChangePic}
			aria-label="Change profile picture"
			style={
				avatarSrc
					? { backgroundImage: `url(${avatarSrc})`,
						backgroundSize: "cover",
						backgroundPosition: "center" }
					: undefined
				}
			>
				{/* show this text in the middle when no picture */}
				{!avatarSrc && <span className="avatar__cta">Change Picture</span>}

				{/* show semi-circle only when a picture exists */}
				{avatarSrc && <span className="avatar__hover">Change Pic</span>}
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

      {editing === "pic" && (
        <Modal title="Change your head shot." onClose={() => setEditing(null)}>
          <ProfilePicForm
            onCancel={() => setEditing(null)}
            onSave={(src) => { setAvatarSrc(src); setEditing(null); }}
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

/* ---------- Modal ---------- */

function Modal({ title, children, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="overlay" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <div className="popup" onMouseDown={(e) => e.stopPropagation()}>
        <div className="popup-title">{title}</div>
        <div className="popup-content">{children}</div>
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
    <form className="popup-form" onSubmit={(e) => { e.preventDefault(); if (canSave) onSave(v.trim()); }}>
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

function ProfilePicForm({ onSave, onCancel }) {
  const stageRef = useRef(null);      // circle stage (for diameter)
  const imgRef   = useRef(null);      // <img> element used for preview
  const [img, setImg] = useState(null);     // HTMLImageElement after load
  const [fileName, setFileName] = useState("");

  // transform state
  const [zoom, setZoom] = useState(1);      // 1..3
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // dragging
  const drag = useRef({ active: false, x: 0, y: 0, ox: 0, oy: 0 });
  const startDrag = (e) => {
    const p = "touches" in e ? e.touches[0] : e;
    drag.current = { active: true, x: p.clientX, y: p.clientY, ox: offset.x, oy: offset.y };
  };
  const moveDrag = (e) => {
    if (!drag.current.active) return;
    const p = "touches" in e ? e.touches[0] : e;
    setOffset({
      x: drag.current.ox + (p.clientX - drag.current.x),
      y: drag.current.oy + (p.clientY - drag.current.y),
    });
  };
  const endDrag = () => (drag.current.active = false);

  // load from file
  const onFile = (f) => {
    if (!f) return;
    setFileName(f.name);
    const url = URL.createObjectURL(f);
    const i = new Image();
    i.onload = () => setImg(i);
    i.src = url;
  };

  // load from url text input
  const [url, setUrl] = useState("");
  const loadUrl = () => {
    if (!url.trim()) return;
    const i = new Image();
    i.crossOrigin = "anonymous"; // allow canvas export for most hosts
    i.onload = () => { setImg(i); setFileName(url.split("/").pop() || "image.png"); };
    i.src = url.trim();
  };

  const canSave = !!img;

  // export exactly what you see
  const handleSave = (e) => {
    e.preventDefault();
    if (!img || !stageRef.current) return;

    const D = stageRef.current.clientWidth;    // stage diameter in CSS px
    const size = 512;                          // output resolution
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    // compute how the image is fit initially (cover the circle)
    const baseScale = D / Math.min(img.width, img.height); // how many CSS px per image px when zoom=1
    const effScaleCss = baseScale * zoom;                  // CSS scale shown in the preview

    // factor to translate CSS px -> canvas px
    const cssToCanvas = size / D;

    ctx.clearRect(0, 0, size, size);
    ctx.save();
    // circular mask
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.clip();

    // place image so its center is at circle center + offset
    ctx.translate(
      size / 2 + offset.x * cssToCanvas,
      size / 2 + offset.y * cssToCanvas
    );
    ctx.scale(effScaleCss * cssToCanvas, effScaleCss * cssToCanvas);
    // draw image centered
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();

    const dataUrl = canvas.toDataURL("image/png");
    onSave(dataUrl, fileName);
  };

  return (
    <form className="popup-form" onSubmit={handleSave}>
  <div className="upload-panel">
    <div className="upload-title">Upload your Picture</div>

    {/* CROP STAGE */}
    <div
      ref={stageRef}
      className="crop-stage"
      onMouseDown={startDrag}
      onMouseMove={moveDrag}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchStart={startDrag}
      onTouchMove={moveDrag}
      onTouchEnd={endDrag}
    >
      {img ? (
        <img
          src={img.src}
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(-50%,-50%) translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transformOrigin: "center center",
            userSelect: "none",
            pointerEvents: "none",
            maxWidth: "none",
          }}
        />
      ) : (
        <div className="crop-placeholder"></div>
      )}
    </div>

    {/* zoom */}
    <input
      type="range"
      min="1"
      max="3"
      step="0.01"
      value={zoom}
      onChange={(e) => setZoom(parseFloat(e.target.value))}
      className="crop-zoom"
    />
  </div>

  {/* rest of your form stays the same */}
  <div className="field-block">
    <label className="btn ghost" style={{ display: "inline-block", cursor: "pointer" }}>
      Choose File
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onFile(e.target.files?.[0] || null)}
        style={{ display: "none" }}
      />
    </label>
    <span style={{ marginLeft: 8 }}>{fileName}</span>
  </div>

  <div className="field-block">
    <div className="field-label">OR Enter the path to the picture:</div>
    <div style={{ display: "flex", gap: 8 }}>
      <input
        className="popup-input"
        placeholder="https://example.com/image.jpg"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="button" className="btn solid" onClick={loadUrl}>Load</button>
    </div>
  </div>

  <Actions canSave={canSave} onCancel={onCancel} />
</form>);
}
