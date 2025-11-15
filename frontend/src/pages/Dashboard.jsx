import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import defaultAvatar from "../assets/default_avatar.png";


const Dashboard = ({ username, room_num, userId }) => {
  const navigate = useNavigate();

  // ====== chores state ======
  const [chores, setChores] = useState([]);

  // ====== GOOGLE OAUTH (GIS) ======
  const clientRef = useRef(null);
  const loadingScriptRef = useRef(false);

  // Ensure the Google script exists (once)
  const ensureGsiScript = () =>
    new Promise((resolve, reject) => {
      if (window.google?.accounts?.oauth2) return resolve();
      if (loadingScriptRef.current) {
        // wait until it's there
        const wait = setInterval(() => {
          if (window.google?.accounts?.oauth2) {
            clearInterval(wait);
            resolve();
          }
        }, 50);
        setTimeout(() => {
          clearInterval(wait);
          if (!window.google?.accounts?.oauth2) reject(new Error("GIS load timeout"));
        }, 6000);
        return;
      }
      loadingScriptRef.current = true;
      const s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client";
      s.async = true;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("Failed to load Google script"));
      document.head.appendChild(s);
    });

  // Create the code client (idempotent)
  const ensureCodeClient = async () => {
    await ensureGsiScript();
    if (!clientRef.current) {
      clientRef.current = window.google.accounts.oauth2.initCodeClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/calendar.events",
        ux_mode: "popup",
        callback: async ({ code }) => {
          if (!code) return;

          try {
            // 1) Exchange auth code for tokens (sets session cookie)
            const r = await fetch("http://localhost:3000/api/auth/exchange-code", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ code }),
            });
            if (!r.ok) throw new Error("exchange-code failed");

            // 2) Poll /status until connected or timeout
            const start = Date.now();
            while (Date.now() - start < 8000) { // up to 8s
              try {
                const s = await fetch("http://localhost:3000/api/auth/status", {
                  credentials: "include",
                });
                const j = await s.json();
                if (j?.connected) break;
              } catch {}
              await new Promise((res) => setTimeout(res, 300));
            }
          } catch (err) {
            console.error("OAuth exchange/status check failed:", err);
          } finally {
            // 3) Redirect to your calendar page regardless
            // Use either navigate or full URL; full URL is most robust:
            window.location.href = "http://localhost:5173/calendar";
            // navigate("/calendar");
          }
        },
      });
    }
  };

  // CLICK: open popup first (don’t block on network before opening)
  const handleCalendarClick = async () => {
    try {
      // Fire a status check but DO NOT await it before popup (prevents popup blocking)
      fetch("http://localhost:3000/api/auth/status", { credentials: "include" })
        .then((r) => r.json())
        .then((j) => {
          if (j?.connected) {
            // already connected: jump right away
            window.location.href = "http://localhost:5173/calendar";
          }
        })
        .catch(() => {});

      await ensureCodeClient();
      clientRef.current.requestCode(); // must be in direct click to avoid blockers
    } catch (e) {
      console.error("Calendar click error:", e);
    }
  };

  // ====== chores fetch (your original logic) ======
  useEffect(() => {
    if (!room_num) return;
    const fetchChores = async () => {
      try {
        const res = await fetch(`http://localhost:3000/get/chores/${room_num}`);
        const data = await res.json();
        setChores(data);
      } catch (err) {
        console.error("Error fetching chores:", err);
      }
    };
    fetchChores();
  }, [room_num]);

  return (
    <div className="dashboard">
      {/* Sidebar with profile and navigation links */}
      <aside className="sidebar">
        <div className="profile">
          <div className="profile-pic">
            <img
              src={
                userId
                  ? `http://localhost:3000/uploads/profile_pictures/user_${userId}.jpg`
                  : defaultAvatar
              }
              alt={`${username}'s profile`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = defaultAvatar;
              }}
            />
          </div>
          <p className="greeting">Hey, {username}</p>
        </div>

        <nav className="nav-menu">
          <ul>
            <li onClick={handleCalendarClick}>Calendar</li>
            <li onClick={() => navigate("/chores")}>Chores</li>
            <li onClick={() => navigate("/bills")}>Bills</li>
          </ul>
        </nav>
      </aside>


      <main className="main-content">
        <div className="chore-card">
          <h2>Your Chore List</h2>
          <div className="chore-list">
            {chores.length === 0 ? (
              <p className="chore-empty">No chores yet</p>
            ) : (
              chores.map((chore) => {
                const due = new Date(chore.due_date).toLocaleDateString();
                const statusClass = chore.is_finished ? "done" : "pending";

                return (
                  <div className="chore-item" key={chore.id}>
                    <div className="chore-main-row">
                      <span className="chore-dot">•</span>
                      <div className="chore-text">
                        <span className="chore-name">{chore.chore_name}</span>
                        {/* <span className="chore-room">Room {chore.room_num}</span> */}
                      </div>
                    </div>

                    <div className="chore-meta-row">
                      <span className="chore-due">Due {due}</span>
                      <span className={`chore-status ${statusClass}`}>
                        {chore.is_finished ? "Finished" : "Pending"}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* Right sticky notes section */}
      <aside className="right-notes">
        <div className="quote-card">
          <p>“On Wednesdays, We Wear Pink”</p>
          <p>“That's So Fetch!”</p>
        </div>
        <div className="divider">✧ ✦ ✧</div>
        <div className="bills-card">
          <p><strong>Overdue Charges</strong></p>
          <p><span>Target: $125. 17</span></p>
          <p><span>Trader Joe's: $67.67</span></p>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
