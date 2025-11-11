import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewChore.css";

export default function NewChore() {
  const navigate = useNavigate();
  const [newChore, setNewChore] = useState({
    user_id: "",
    chore_name: "",
    due_date: "",
    room_num: "",
    description: ""
  });

  const handleChange = (e) => {
    setNewChore({ ...newChore, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    console.log("Creating chore:", newChore);
    // Here you would send the data to backend
    navigate("/chores"); // redirect back to chores page
  };

  const handleCancel = () => {
    if (window.confirm("Changes won't be saved. Do you want to cancel?")) {
      navigate("/chores");
    }
  };

  return (
    <div className="new-chore-page">
      <h1>Create New Chore</h1>

      <div className="chore-form">
        <input
          type="text"
          name="user_id"
          placeholder="User ID"
          value={newChore.user_id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="chore_name"
          placeholder="Chore Name"
          value={newChore.chore_name}
          onChange={handleChange}
        />
        <input
          type="date"
          name="due_date"
          placeholder="Due Date"
          value={newChore.due_date}
          onChange={handleChange}
        />
        <input
          type="text"
          name="room_num"
          placeholder="Room Number"
          value={newChore.room_num}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newChore.description}
          onChange={handleChange}
        />
      </div>

      <div className="chore-buttons">
        <button className="add-chore-btn" onClick={handleCreate}>
          Add Chore
        </button>
        <button className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
