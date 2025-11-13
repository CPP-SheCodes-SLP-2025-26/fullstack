import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

// Dashboard component showing sidebar, chores, and right sticky notes
const Dashboard = ({ username, userId }) => {
  const navigate = useNavigate();

  // state to store chores fetched from backend
  const [chores, setChores] = useState([]);

  // fetch chores for this user when component mounts or userId changes
  useEffect(() => {
    const fetchChores = async () => {
      try {
        //  fetch chores for the logged-in user
        const res = await fetch(`http://localhost:3000/get/personal/chores/${userId}`);
        const data = await res.json();
        setChores(data); // store fetched chores in state
      } catch (err) {
        console.error("Error fetching chores:", err);
      }
    };

    fetchChores();
  }, [userId]); // re-run if userId changes

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
            <li onClick={() => navigate("/calendar")}>Calendar</li>
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
            {/* map through chores and display each */}
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

