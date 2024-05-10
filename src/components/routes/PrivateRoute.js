import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loading from "./Loading";
import axios from "axios";

export default function PrivateRoute () {
    // context
    const [ auth, setAuth ] = useAuth()
    // state
    const [ ok, setOk ] = useState(false)

    // more secure but not redirecting after logout on the user dashboard page??
    useEffect(() => {
        const authCheck = async () => {
            const { data } = await axios.get('/auth-check')
            // console.log('data', data.ok)
            if (data.ok) {
                setOk(true)
                // console.log('setOk => ', ok)
            } else {
                setOk(false)
                // console.log('setOk => ', ok)
            }
        }

        if (auth?.token) authCheck()
    }, [auth?.token])

    // useEffect(() => {
    //     if (auth?.token) {
    //         setOk(true)
    //     } else {
    //         setOk(false)
    //     }
    // }, [auth?.token])

    return ok ? <Outlet /> : <Loading />
}