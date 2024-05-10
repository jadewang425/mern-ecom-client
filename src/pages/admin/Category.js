import { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import Jumbotron from "../../components/cards/jumbotron"
import AdminNavbar from "../../components/AdminNavbar"
import axios from "axios"
import toast from "react-hot-toast"
import CategoryForm from "../../components/forms/CategoryForm"
import { Button, Modal } from "antd"

export default function AdminCategory() {
    // context
    const [ auth, setAuth ] = useAuth()

    const [ name, setName ] = useState('')
    const [ categories, setCategories ] = useState([])
    const [ visible, setVisible ] = useState(false)
    const [ selected, setSelected ] = useState(null)
    const [ updateName, setUpdateName ] = useState('')

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
    const handleUpdate = async (evt) => {
        evt.preventDefault()
        try {
            const { data } = await axios.put(`/category/${selected._id}`, {name: updateName})
            if(data?.error) {
                toast.error(data.error)
            } else {
                toast.success(`${data.name} is updated.`)
                setSelected(null)
                setUpdateName('')
                loadCategories()
                setVisible(false)
            }
        } catch (err) {
            console.log(err)
            toast.error('Category may already exist. Try again.')
        }
    }

    const handleDelete = async (evt) => {
        evt.preventDefault()
        try {
            const { data } = await axios.delete(`/category/${selected._id}`)
            if(data?.error) {
                toast.error(data.error)
            } else {
                toast.success(`${data.name} is deleted.`)
                setSelected(null)
                loadCategories()
                setVisible(false)
            }
        } catch (err) {
            console.log(err)
            toast.error('Category may already exist. Try again.')
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

                        <CategoryForm 
                            name={name}
                            setName={setName}
                            handleSubmit={handleSubmit}
                        />

                        <hr/>
                        
                        <div className="d-flex flex-wrap">
                            { categories?.map((c) => (
                                <button 
                                    key={c.id} className="btn btn-outline-primary m-3" 
                                    onClick={() => {
                                    setVisible(true)
                                    setSelected(c)
                                    setUpdateName(c.name)
                                    }}
                                >
                                    {c.name}
                                </button>
                            ))}
                        </div>

                    <Modal 
                        visible={visible} 
                        onOk={() => setVisible(false)} 
                        onCancel={() => setVisible(false)} 
                        footer={null}
                    >
                        <CategoryForm 
                            name={updateName}
                            setName={setUpdateName}
                            handleSubmit={handleUpdate}
                            handleDelete={handleDelete}
                            btnText='Update'
                        />

                    </Modal>

                    </div>
                </div>
            </div>
        </>
    )
}