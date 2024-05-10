export default function CategoryForm (props) {
    const { name, setName, handleSubmit, btnText='Submit', handleDelete } = props
    
    return (
        <div className="p-3">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    className="form-control p-3"
                    placeholder="Enter category name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary mt-3">{btnText}</button>
                    {handleDelete && (
                        <button className="btn btn-danger mt-3" onClick={handleDelete}>
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}