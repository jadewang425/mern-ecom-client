import { useEffect, useState } from "react"
import { useAuth } from "../../context/auth"
import Jumbotron from "../../components/cards/jumbotron"
import AdminNavbar from "../../components/nav/AdminNavbar"
import axios from "axios"
import { Select } from "antd"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"

export default function AdminProductUpdate() {
    // context
    const [ auth, setAuth ] = useAuth()

    // const [ product, setProduct ] = useState()

    // state
    const [ categories, setCategories ] = useState([])
    const [ photo, setPhoto ] = useState('')
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ category, setCategory ] = useState('')
    const [ shipping, setShipping ] = useState('')
    const [ quantity, setQuantity ] = useState('')
    const [ id, setId ] = useState('')

    const navigate = useNavigate()
    const params = useParams()
    console.log(params)

    useEffect(() => {
        loadProduct()
    }, [])

    useEffect(() => {
        loadCategories()
    }, [])

    const loadProduct = async () => {
        try {
            const { data } = await axios.get(`/product/${params.slug}`)
            setName(data.name)
            setDescription(data.description)
            setPrice(data.price)
            setCategory(data.category._id)
            setShipping(data.shipping)
            setQuantity(data.quantity)
            setId(data._id)
        } catch (err) {
            console.log(err)
        }
    }

    const loadCategories = async () => {
        try {
            const { data } = await axios.get('/categories')
            setCategories(data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            photo && productData.append('photo', photo)
            productData.append('name', name)
            productData.append('description', description)
            productData.append('price', price)
            productData.append('category', category)
            productData.append('shipping', shipping)
            productData.append('quantity', quantity)

            // console.log([...productData])

            const { data } = await axios.put(`/product/${id}`, productData)
            if(data?.error) {
                toast.error(data.error)
            } else {
                toast.success(`"${data.name}" is updated`)
                navigate("/dashboard/admin/products")
            }
        } catch (err) {
            console.log(err)
            toast.error('Product create failed. Try again.')
        }
    }

    const handleDelete = async (req, res) => {
        try {
            let answer = window.confirm(
                'Are you sure you want to delete this product?'
            )
            if (!answer) return
            const { data } = await axios.delete(`/product/${id}`)
            toast.success(`"${data.name}" is deleted.`)
            navigate("/dashboard/admin/products")
        } catch (err) {
            console.log(err)
            toast.error('Delete failed. Try again.')
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
                        <div className="p-3 mt-2 mb-2 bg-light h4">Update Products</div>
                        {photo ? (
                            <div className="text-center">
                                <img 
                                    src={URL.createObjectURL(photo)} 
                                    alt="product photo" 
                                    className="img img-responsive"
                                    height='200px'
                                />                            
                            </div>
                        ) : (
                            <div className="text-center">
                                <img 
                                    src={`${process.env.REACT_APP_API}/product/photo/${id}`} 
                                    alt="product photo" 
                                    className="img img-responsive"
                                    height='200px'
                                /> 
                            </div>
                        )}
                        <div className="pt-2">
                            <label className="btn btn-outline-secondary p-2 col-12 mb-3">
                                {photo ? photo.name : 'Upload photo'}
                                <input 
                                    type="file" 
                                    name="photo" 
                                    accept="image/*" 
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                    hidden
                                />
                            </label>
                        </div>
                        <input 
                            type="text" 
                            className="form-control p-2 mb-2" 
                            placeholder="Product name" 
                            value={name} 
                            onChange={e => setName(e.target.value)}
                        />
                        <textarea 
                            type="text" 
                            className="form-control p-2 mb-2" 
                            placeholder="Product description" 
                            value={description} 
                            onChange={e => setDescription(e.target.value)}
                        />
                        <input 
                            type="number" 
                            className="form-control p-2 mb-2" 
                            placeholder="Product price" 
                            value={price} 
                            onChange={e => setPrice(e.target.value)}
                        />
                        <Select
                            placeholder='Select shipping'
                            optionFilterProp="children"
                            onChange={(v) => setShipping(v)}
                            options={[{value: '1', label: 'Yes'}, {value: '0', label: 'No'}]}
                            className="col-12 mb-2"
                            value={shipping ? 'Yes' : 'No'}
                        />
                        <Select
                            placeholder='Select a category'
                            optionFilterProp="children"
                            onChange={(v) => setCategory(v)}
                            options={categories?.map(c => ({value: c._id, label: c.name}))}
                            className="col-12 mb-2"
                            value={category}
                        />
                        <input 
                            type="number" 
                            min="1"
                            className="form-control p-2 mb-2" 
                            placeholder="Product quantity" 
                            value={quantity} 
                            onChange={e => setQuantity(e.target.value)}
                        />
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-primary" onClick={handleSubmit}>Update</button>
                            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}