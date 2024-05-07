import { ListGroup } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export default function AdminNavbar() {
    return (
        <>
            <div className="p-3 mt-2 mb-2 bg-light h4">Admin Links</div>
            <ListGroup>
                <NavLink className='list-group-item' to='/dashboard/admin/category'>Create Category</NavLink>
                <NavLink className='list-group-item' to='/dashboard/admin/product'>Create Product</NavLink>
            </ListGroup>
        </>
        
    )
}