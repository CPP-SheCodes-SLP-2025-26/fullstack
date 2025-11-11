import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Chores.css";

export default function Chores() {

  const navigate = useNavigate();


  // Dummy data for now
    const [chores, setChores] = useState([
    { id: 1, chore_name: "Vacuum", due_date: "2025-11-12", user_id: 101, room_num: 2, description: "Vacuum living room", is_finished: false },
    { id: 2, chore_name: "Dishes", due_date: "2025-11-13", user_id: 102, room_num: 1, description: "Clean all dishes", is_finished: false },
    { id: 3, chore_name: "Laundry", due_date: "2025-11-14", user_id: 103, room_num: 3, description: "Wash and fold clothes", is_finished: false }
  ]);

  

  const toggleDetails = (id) => {
    setChores((prev) =>
      prev.map((chore) =>
        chore.id === id ? { ...chore, showDetails: !chore.showDetails } : chore
      )
    );
  };

  const markComplete = (id) => {
    setChores((prev) =>
      prev.map((chore) =>
        chore.id === id ? { ...chore, is_finished: true } : chore
      )
    );
  };

  
  return (
    <div className="chores-page">

      <div className="add-chore-container">
        <button className="add-chore-btn" onClick={() => navigate("/new-chore")}>
          Add New Chore
        </button>
      </div>


      {/* Chores List */}
      <div className="chores-list">
        {chores.map((chore) => (
          <div className="chore-card" key={chore.id}>
            <div className="chore-header">
              <p className="chore-name">{chore.chore_name}</p>
              <div className="right-actions">
                
                <button className="toggle-btn" onClick={() => toggleDetails(chore.id)}>
                  ▼
                </button>
              </div>
            </div>

            {chore.showDetails && (
              <div className="chore-details">
                <p>User ID: {chore.user_id}</p>
                <p>Due Date: {chore.due_date}</p>
                <p>Room: {chore.room_num}</p>
                <p>Description: {chore.description}</p>
                <button
                  className={`mark-done-btn ${chore.is_finished ? "done" : ""}`}
                  onClick={() => markComplete(chore.id)}
                >
                  {chore.is_finished ? "💋 Completed" : "Mark Complete"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}



/* ------------------------- For backend connection -----------------------------------
 - remove dummy data 

  import { useEffect } from "react";
  import axios from "axios";

  useEffect(() => {
    fetchChores();
  }, []);

  const fetchChores = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get/chores");
      setChores(response.data);
    } catch (err) {
      console.error("Error fetching chores:", err);
    }
  };

  const markComplete = async (id) => {
    try {
      await axios.put(`http://localhost:5000/chore/completed/${id}`);
      fetchChores(); // refresh after marking
    } catch (err) {
      console.error("Error marking chore complete:", err);
    }
  };
*/
