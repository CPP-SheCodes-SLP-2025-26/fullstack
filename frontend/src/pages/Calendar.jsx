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
    ]);
  }, []);

  const handleDateClick = useCallback((info) => {
    alert(`Clicked on date: ${info.dateStr}`);
  }, []);

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <h2>My Calendar</h2>
        <ConnectGoogleButton />
      </div>

      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          height="auto"
        />
      </div>
    </div>
  );
}
