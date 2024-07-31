import { useAuth } from "../../context/auth"
import Jumbotron from "../../components/cards/jumbotron"
import { ListGroup, ListGroupItem } from "react-bootstrap"
import AdminNavbar from "../../components/nav/AdminNavbar"

export default function AdminDashboard() {
    // context
    const [ auth, setAuth ] = useAuth()

    return (
        <>
            <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="Admin Dashboard" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminNavbar />
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 bg-light h4">Admin Information</div>
                        <ListGroup>
                            <ListGroupItem>{auth?.user?.name}</ListGroupItem>
                            <ListGroupItem>{auth?.user?.email}</ListGroupItem>
                            <ListGroupItem>Admin</ListGroupItem>
                        </ListGroup>
                    </div>
                </div>
            </div>
        </>
    )
}