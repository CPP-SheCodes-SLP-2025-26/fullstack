function CreateChore() {

    return(
        <div className="text-center text-primary mt-5">
            <h1>Add New Chore</h1>

        <div className="container shadow rounded p-4"
            style={{
                minHeight: '80vh',
                maxWidth: '600px',
                margin: '20px auto'
            }}
            >
            <form>
                <div className="mb-3 text-start mt-3">
                    <label htmlFor="choreTitle" className="form-label">
                        Chore Title:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="choreTitle"
                        placeholder="Enter chore name"
                        />
                </div>

                <div className="mb-3 text-start">
                    <label htmlFor="dueDate" className="form-label">
                        Due Date:
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="dueDate"
                        />
                </div>

                   <div className="mb-3 text-start">
                    <label htmlFor="description" className="form-label">
                        Description:
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows="5"
                        placeholder="Enter details about the chore!"
                        />
                        </div>
                    <button type="submit" className="btn btn-primary mt-5">
                        Add Chore
                        </button>
            </form>
        </div>
        </div>
    )
}

export default CreateChore