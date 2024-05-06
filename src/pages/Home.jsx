import Jumbotron from "../components/cards/jumbotron"
import { useAuth } from "../context/auth"

export default function Home () {
    const [auth, setAuth] = useAuth()

    return (
        <div>
            <Jumbotron title="Hello World" />
            <pre>{JSON.stringify(auth, null, 4)}</pre>
        </div>
    )
}