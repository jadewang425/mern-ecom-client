import { useState } from "react"
import Jumbotron from "../../components/cards/jumbotron"
import axios from "axios"
import toast from "react-hot-toast"

export default function Login () {
    const [ email, setEmail ] = useState('jen425@gmail.com')
    const [ password, setPassword ] = useState('jade425')

    const handleSubmit = async (evt) => {
        evt.preventDefault()

        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/login`, {
                email,
                password,
            })
            console.log(data)
            if (data?.error) {
                toast.error(data.error)
            } else {
                toast.success("Login successful")
            }
        } catch (err) {
            console.log(err)
            toast.error('Login failed. Try again.')
        }
    }

    return (
        <div>
            <Jumbotron title="Login" />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="email" 
                                className="form-control mb-4 p-2" 
                                placeholder="Enter your email"
                                value={email}
                                onChange={(evt) => {setEmail(evt.target.value)}}
                            />
                            <input 
                                type="password" 
                                className="form-control mb-4 p-2" 
                                placeholder="Enter your password"
                                value={password}
                                onChange={(evt) => {setPassword(evt.target.value)}}
                            />
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* <pre>{JSON.stringify(name, null, 4)}</pre> */}
        </div>
    )
}