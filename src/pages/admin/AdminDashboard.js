import { useAuth } from "../../context/auth"
import Jumbotron from "../../components/cards/jumbotron"
import { ListGroup, Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export default function AdminDashboard() {
    // context
    const [ auth, setAuth ] = useAuth()

    return (
        <>
            <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="Admin Dashboard" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <div className="p-3 mt-2 mb-2 bg-light h4">Admin Links</div>
                        <ListGroup>
                            <NavLink className='list-group-item' to='/dashboard/admin/category'>Create Category</NavLink>
                            <NavLink className='list-group-item' to='/dashboard/admin/product'>Create Product</NavLink>
                        </ListGroup>
                    </div>
                    <div className="col-md-9">Content</div>
                </div>
            </div>
        </>
    )
}