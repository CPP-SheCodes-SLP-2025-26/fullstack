import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = ({ username, userId }) => {
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
    if (!userId) return;
    const fetchChores = async () => {
      try {
        const res = await fetch(`http://localhost:3000/get/personal/chores/${userId}`);
        const data = await res.json();
        setChores(data);
      } catch (err) {
        console.error("Error fetching chores:", err);
      }
    };
    fetchChores();
  }, [userId]);

  return (
    <div className="dashboard">
      {/* Sidebar with profile and navigation links */}
      <aside className="sidebar">
        <div className="profile">
          <div className="profile-pic"></div>
          <p className="greeting">Hey, {username}</p>
        </div>
        <nav className="nav-menu">
          <ul>
            {/* <li onClick={() => navigate("/home")}>Home</li> */}
            <li onClick={handleCalendarClick}>Calendar</li>
            <li onClick={() => navigate("/chores")}>Chores</li>
            <li onClick={() => navigate("/bills")}>Bills</li>
          </ul>
        </nav>
      </aside>

      {/* Main content showing chore list */}
      <main className="main-content">
        <div className="chore-card">
          <h2>Your Chore List</h2>
          <ul>
            {chores.map((chore) => (
              <li key={chore.id}>
                {chore.chore_name} - Room {chore.room_num} - Due{" "}
                {new Date(chore.due_date).toLocaleDateString()} -{" "}
                {chore.is_finished ? "Finished" : "Pending"}
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Right sticky notes section */}
      <aside className="right-notes">
        <div className="quote-card">
          <p>“On Wednesdays, We Wear Pink”</p>
          <p>“That's So Fetch!”</p>
        </div>
        <div className="events-card">
          <p>Upcoming Events</p>
          <p><span>Nov 16: SLP Demo Day</span></p>
          <p><span>Nov 27: Thanksgiving</span></p>
        </div>
        <div className="bills-card">
          <p>Overdue Charges</p>
          <p><span>Target: $125. 17</span></p>
          <p><span>Trader Joe's: $67.67</span></p>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
