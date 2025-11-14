import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function CalendarPage() {
  const [creating, setCreating] = useState(false);

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
        endISO: end.toISOString(),
      }),
    });
    setCreating(false);
    window.dispatchEvent(new Event("refetch-events"));
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Calendar</h2>

      <button onClick={createDemoEvent} disabled={creating} style={{ marginBottom: 12 }}>
        {creating ? "Creating..." : "Create button (need to do)"}
      </button>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={async (info, success, failure) => {
          try {
            const url = new URL("http://localhost:3000/api/calendar/events");
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

      <RefetchOnCustomEvent />
    </div>
  );
}

function RefetchOnCustomEvent() {
  useEffect(() => {
    const handler = () => {
      const fc = document.querySelector(".fc");
      if (!fc) return;
      const inst = fc.__fullCalendar;
      if (inst?.getApi) inst.getApi().refetchEvents();
    };
    window.addEventListener("refetch-events", handler);
    return () => window.removeEventListener("refetch-events", handler);
  }, []);
  return null;
}
