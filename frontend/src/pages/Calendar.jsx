import { useEffect, useState, useCallback, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ConnectGoogleButton from "../components/ConnectGoogleButton.jsx";

export default function CalendarPage() {
  const [connected, setConnected] = useState(false);
  const [creating, setCreating] = useState(false);
  const calendarRef = useRef(null);

  const refreshStatus = useCallback(async () => {
    const r = await fetch("http://localhost:3000/api/auth/status", { credentials: "include" });
    const j = await r.json();
    setConnected(!!j.connected);
  }, []);

  useEffect(() => { refreshStatus(); }, [refreshStatus]);

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

    // ask FullCalendar to refetch via custom event
    window.dispatchEvent(new Event("refetch-events"));
  }

  // (Removed the undefined `events`/`upcomingEvents` code)

  return (
    <>
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
              ref={calendarRef}
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={async (info, success, failure) => {
                try {
                  const url = new URL("http://localhost:3000/api/calendar/events");
                  url.searchParams.set("start", info.startStr);
                  url.searchParams.set("end", info.endStr);
                  const r = await fetch(url, { credentials: "include" });
                  const data = await r.json();
                  success(data);
                } catch (e) {
                  failure(e);
                }
              }}
              height="auto"
            />

            <RefetchOnCustomEvent calendarRef={calendarRef} />
          </>
        )}
      </div>
    </>
  );
}

// Helper component to refetch events when we dispatch "refetch-events"
function RefetchOnCustomEvent({ calendarRef }) {
  useEffect(() => {
    const handler = () => {
      const api = calendarRef.current?.getApi?.();
      api?.refetchEvents();
    };
    window.addEventListener("refetch-events", handler);
    return () => window.removeEventListener("refetch-events", handler);
  }, [calendarRef]);
  return null;
}
