import { useEffect, useState, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ConnectGoogleButton from "../components/ConnectGoogleButton.jsx";
import "./Calendar.css";


export default function Calendar() {
  const [events, setEvents] = useState([]);

  // Example: load some demo events
  useEffect(() => {
    setEvents([
      { title: "Meeting", date: "2025-11-09" },
      { title: "Party", date: "2025-11-10" },
      { title: "Doctor Appt", date: "2025-11-12" },
    ]);
  }, []);

  const handleDateClick = useCallback((info) => {
    alert(`Clicked on date: ${info.dateStr}`);
  }, []);

  // Get upcoming events (future dates only)
  const today = new Date().toISOString().slice(0, 10);
  const upcomingEvents = events.filter(e => e.date >= today);

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <h2>My Calendar</h2>
        <ConnectGoogleButton />
      </div>

      <div className="calendar-main-row">
        <div className="calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick}
            height="auto"
          />
        </div>
        <aside className="calendar-sidebar">
          <h3>Upcoming Events</h3>
          <ul className="upcoming-list">
            {upcomingEvents.length === 0 ? (
              <li>No upcoming events.</li>
            ) : (
              upcomingEvents.map((event, idx) => (
                <li key={idx}>
                  <strong>{event.title}</strong>
                  <br />
                  <span>{event.date}</span>
                </li>
              ))
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
}
