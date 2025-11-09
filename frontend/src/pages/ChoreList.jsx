import Chorecard from "../components/Chorecard"

function ChoreList() {
  return (
    <div className="container mt-">
      <h1 className="text-center text-primary mt-4">Your Chore List</h1>
      
      <div className="card shadow p-3 px-2 mb-4 d-flex flex-row align-items-center gap-3 justify-content-center mx-auto mt-4 mb-4" style={{ maxWidth: '600px' }}>
        <span className="fw-bold">Filter by:</span>
      <button className="btn btn-success">Your Chores Only</button>
      <button className="btn btn-success">Due Date</button>
      </div>
       <div>

      <div className="d-flex flex-column align-items-center gap-3">
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

export default ChoreList