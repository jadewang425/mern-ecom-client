import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

export default function Loading({path = "login"}) {
    // state
    const [count, setCount] = useState(1)
    // hooks
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)

        // redirect once count is equal to 0
        count === 0 && navigate(`/${path}`, {
            state: location.pathname,
        })
        // clear interval
        return () => clearInterval(interval)
    }, [count])

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" variant="secondary" />
                {/* <div className="p-3">Redirecting you in {count} seconds.</div> */}
            </div>
        </>
    )

}