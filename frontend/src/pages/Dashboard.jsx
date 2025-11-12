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
            {/* <li onClick={() => navigate("/home")}>Home</li> */}
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
          <div className="underline2"></div>
          {/* Chore list items will go here */}
        </div>
      </main>

      {/* Right sticky notes */}
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
