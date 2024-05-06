import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Loading() {
    // state
    const [count, setCount] = useState(3)
    // hooks
    const navigate = useNavigate()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)

        // redirect once count is equal to 0
        count === 0 && navigate("/login")
        // clear interval
        return () => clearInterval(interval)
    }, [count])

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" variant="secondary" />
                <div className="p-3">Redirecting you in {count} seconds.</div>
            </div>
        </>
    )

}