import Chorecard from "../components/ChoreCard";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Chores.css';

function Chores() {
  const navigate = useNavigate();
  const [chores, setChores] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
   async function fetchChores() {
  try {
    const response = await fetch('http://localhost:3000/get/chores');
    const data = await response.json();
    setChores(data);
  } catch (err) {
    console.error("Failed to fetch chores", err);
  }
}

    fetchChores();
  }, []);

  return (
    <div className="chore-container mt- main-container">
       <button className="create-chore-btn" onClick={() => navigate("/create-chore")}> Add a new <br/>chore! </button>
      <h1 className="text-center mt-4 fs-1 mb-5 chore-title">Your Chore List</h1>
      
      <div className="mb-4 d-flex flex-row align-items-center gap-4 justify-content-center mx-auto mt-4 mb-5 filter-container" style={{ maxWidth: '700px' }}>
        <span className="fw-bold">Filter by:</span>
      <button className="btn filter-btn">Your Chores Only</button>
      <button className="btn filter-btn">Due Date</button>

     
      </div>
       <div>

      <div className="d-flex flex-column align-items-center gap-5">
        {chores.map((chore)=>(
        <Chorecard 
          key={chore.id}
          title={chore.chore_name} 
          dueDate={chore.due_date}
          description={chore.description}/>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Chores