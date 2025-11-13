import Chorecard from "../components/ChoreCard";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Modal from '../components/Modal'
import './Chores.css';

function Chores() {
  const navigate = useNavigate();
  const [chores, setChores] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [choreToDelete, setChoreToDelete] = useState(null);

  const handleDeleteChore = (chore) =>{
    setChoreToDelete(chore);
    setIsModalOpen(true);
  }

  const confirmDelete = async() =>{
    if(!choreToDelete) return;
    try{
      const response = await fetch(`http://localhost:3000/chores/${choreToDelete.id}`, {
        method: 'DELETE',
      });
        if (response.ok){
            setChores(prev => prev.filter(c => c.id !== choreToDelete.id));
        } 
        else {
          console.error('Failed to delete chore');
        }
      } 
      catch (err) {
        console.error('Error deleting chore:', err);
       } 
      finally {
        setIsModalOpen(false);
        setChoreToDelete(null);
      }
    };
  
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
  }, [chores]);

  return (
    <div className="chore-container mt- main-container">
       <button className="create-chore-btn" onClick={() => navigate("/create-chore")}> Add a new <br/>chore! </button>
      <h1 className="text-center mt-4 fs-1 mb-5 chore-title">Your Chore List</h1>
      
      <div className="mb-4 d-flex flex-row align-items-center gap-4 justify-content-center mx-auto mt-4 mb-5 filter-container" style={{ maxWidth: '700px' }}>
        <span className="fw-bold">Filter by:</span>
      <button
        className={`btn filter-btn ${selectedFilter === "your-chores" ? "active" : ""}`}
        onClick={() => setSelectedFilter("your-chores")}
      >
        Your Chores Only
      </button>

      <button
        className={`btn filter-btn ${selectedFilter === "due-date" ? "active" : ""}`}
        onClick={() => setSelectedFilter("due-date")}
      >
        Due Date
      </button>

     
      </div>
       <div>

      <div className="d-flex flex-column align-items-center gap-5">
          {chores
    // Sort chores if "due-date" filter is selected
    .sort((a, b) => {
      if (selectedFilter === "due-date") {
        const dateA = new Date(a.due_date);
        const dateB = new Date(b.due_date);
        return dateA - dateB; // earlier dates first
      }
      return 0; // no sorting otherwise
    })
        .map((chore)=>(
        <Chorecard 
          key={chore.id}
          title={chore.chore_name} 
          dueDate={chore.due_date}
          description={chore.description}
          onDelete={() => handleDeleteChore(chore)}
          />
        ))}
      </div>
    </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        >
      </Modal>
    </div>
  )
}

export default Chores