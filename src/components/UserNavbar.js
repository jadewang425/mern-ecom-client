import { ListGroup } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export default function UserNavbar() {
    return (
        <>
            <div className="p-3 mt-2 mb-2 bg-light h4">User Links</div>
            <ListGroup>
                <NavLink className='list-group-item' to='/dashboard/user/profile'>Profile</NavLink>
                <NavLink className='list-group-item' to='/dashboard/user/orders'>Orders</NavLink>
            </ListGroup>
        </>
        
    )
}