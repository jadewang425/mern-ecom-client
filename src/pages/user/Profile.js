import { useAuth } from "../../context/auth"
import Jumbotron from "../../components/cards/jumbotron"
import UserNavbar from "../../components/nav/UserNavbar"

export default function UserProfile() {
    // context
    const [ auth, setAuth ] = useAuth()

    return (
        <>
            <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="User Dashboard" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <UserNavbar />
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 bg-light h4">Profile</div>
                        <p>Update profile...</p>
                    </div>
                </div>
            </div>
        </>
    )
}