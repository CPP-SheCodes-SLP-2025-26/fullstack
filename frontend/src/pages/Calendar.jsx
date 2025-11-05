import { useEffect, useState, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ConnectGoogleButton from "../components/ConnectGoogleButton.jsx";

export default function CalendarPage() {
  const [connected, setConnected] = useState(false);
  const [creating, setCreating] = useState(false);

  // Calls API to see if Google is linked
  const refreshStatus = useCallback(async () => {
    const r = await fetch("http://localhost:3000/api/auth/status", { credentials: "include" });
    const j = await r.json();
    setConnected(!!j.connected);
  }, []);

  useEffect(() => { refreshStatus(); }, [refreshStatus]);

  // quick demo create
  async function createDemoEvent() {
    setCreating(true);
    const start = new Date();
    const end = new Date(Date.now() + 60 * 60 * 1000);
    await fetch("http://localhost:3000/api/calendar/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title: "Demo via app",
        startISO: start.toISOString(),
        endISO: end.toISOString()
      })
    });
    setCreating(false);
    // force FullCalendar to refetch
    const ev = new Event("refetch-events");
    window.dispatchEvent(ev);
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Calendar</h2>

      {!connected ? (
        <>
          <p>Connect your Google account to load events.</p>
          <ConnectGoogleButton onConnected={refreshStatus} />
        </>
      ) : (
        <>
          <button onClick={createDemoEvent} disabled={creating} style={{ marginBottom: 12 }}>
            {creating ? "Creating..." : "Create button (need to do)"}
          </button>

          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={async (info, success, failure) => {
              try {
                const url = new URL("http://localhost:3000/api/calendar/events");
                // FullCalendar provides a range; pass to backend
                url.searchParams.set("start", info.startStr);
                url.searchParams.set("end", info.endStr);
                const r = await fetch(url, { credentials: "include" });
                success(await r.json());
              } catch (e) {
                failure(e);
              }
            }}
            height="auto"
          />

          {/* simple way to refresh after creation */}
          <RefetchOnCustomEvent />
        </>
      )}
    </div>
  );
}

// Helper component to refetch events when we dispatch "refetch-events"
function RefetchOnCustomEvent() {
  useEffect(() => {
    const handler = () => {
      const fc = document.querySelector(".fc"); // FullCalendar root
      if (!fc) return;
      const inst = fc.__fullCalendar; // internal ref in v6
      if (inst?.getApi) inst.getApi().refetchEvents();
    };
    window.addEventListener("refetch-events", handler);
    return () => window.removeEventListener("refetch-events", handler);
  }, []);
  return null;
}
