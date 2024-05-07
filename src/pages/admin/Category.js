import { useAuth } from "../../context/auth"
import Jumbotron from "../../components/cards/jumbotron"
import AdminNavbar from "../../components/AdminNavbar"

export default function AdminCategory() {
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
                        <div className="p-3 mt-2 mb-2 bg-light h4">Manage Categories</div>
                        <p>Create category form</p>
                    </div>
                </div>
            </div>
        </>
    )
}