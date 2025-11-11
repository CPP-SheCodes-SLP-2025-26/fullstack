import Chorecard from "../components/ChoreCard"
import './Chores.css'

function Chores() {
  return (
    <div className="container mt- main-container">
       <button className="create-chore-btn"> Add a new <br/>chore! </button>
      <h1 className="text-center mt-4 fs-1 mb-5 chore-title">Your Chore List</h1>
      
      <div className="mb-4 d-flex flex-row align-items-center gap-4 justify-content-center mx-auto mt-4 mb-5 filter-container" style={{ maxWidth: '700px' }}>
        <span className="fw-bold">Filter by:</span>
      <button className="btn filter-btn">Your Chores Only</button>
      <button className="btn filter-btn">Due Date</button>

     
      </div>
       <div>

      <div className="d-flex flex-column align-items-center gap-5">
        <Chorecard 
          title="Clean Kitchen" 
          text="Wash the dishes and wipe down counters." 
        />
        <Chorecard 
          title="Laundry" 
          text="Sort, wash, and fold clothes." 
        />
        <Chorecard 
          title="Vacuum Living Room" 
          text="Vacuum the floors and dust surfaces." 
        />
      </div>
    </div>
    </div>
  )
}

export default Chores