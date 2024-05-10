import { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import Jumbotron from "../../components/cards/jumbotron"
import AdminNavbar from "../../components/AdminNavbar"
import axios from "axios"
import toast from "react-hot-toast"

export default function AdminCategory() {
    // context
    const [ auth, setAuth ] = useAuth()

    const [ name, setName ] = useState('')
    const [ categories, setCategories ] = useState([])

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = async () => {
        try {
            const { data } = await axios.get('/categories')
            setCategories(data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            const { data } = await axios.post('/category', { name })
            if(data?.error) {
                toast.error(data.error)
            } else {
                loadCategories()
                setName('')
                toast.success(`${data.name} is created.`)
            }
        } catch (err) {
            console.log(err)
            toast.error('Create category failed. Try again.')
        }
    }

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
                        <div className="p-3">
                            <form onSubmit={handleSubmit}>
                                <input 
                                    type="text"
                                    className="form-control p-3"
                                    placeholder="Enter category name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                />
                                <button className="btn btn-primary mt-3">Submit</button>
                            </form>

                            <hr/>
                            
                            <div className="d-flex flex-wrap">
                                { categories?.map((c) => (
                                    <div key={c.id}>
                                        <button className="btn btn-outline-primary m-3">{c.name}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}