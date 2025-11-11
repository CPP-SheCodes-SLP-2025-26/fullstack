import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = ({ username }) => {
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="profile">
          <div className="profile-pic"></div>
          <p className="greeting">Hey, {username}</p>
        </div>
        <nav className="nav-menu">
          <ul>
            <li onClick={() => navigate("/home")}>Home</li>
            <li onClick={() => navigate("/calendar")}>Calendar</li>
            <li onClick={() => navigate("/chores")}>Chores</li>
            <li onClick={() => navigate("/bills")}>Bills</li>
          </ul>
        </nav>
      </aside>

      {/* Middle section */}
      <main className="main-content">
        <div className="chore-card">
          <h2>Your Chore List</h2>
          {/* Chore list items will go here */}
        </div>
      </main>

      {/* Right sticky notes */}
      <aside className="right-notes">
        <div className="quote-card">
          <p>“Some Mean Girls quote here!”</p>
        </div>
        <div className="events-card">
          <p>Upcoming Events</p>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
