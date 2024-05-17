import { useEffect, useState } from "react"
import { useAuth } from "../../context/auth"
import Jumbotron from "../../components/cards/jumbotron"
import AdminNavbar from "../../components/AdminNavbar"
import axios from "axios"
import { Select } from "antd"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function AdminProduct() {
    // context
    const [ auth, setAuth ] = useAuth()

    // state
    const [ categories, setCategories ] = useState([])
    const [ photo, setPhoto ] = useState('')
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ category, setCategory ] = useState('')
    const [ shipping, setShipping ] = useState('')
    const [ quantity, setQuantity ] = useState('')

    const navigate = useNavigate()

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

    const onSearch = (value) => {
        console.log('search:', value)
    }

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append('photo', photo)
            productData.append('name', name)
            productData.append('description', description)
            productData.append('price', price)
            productData.append('category', category)
            productData.append('shipping', shipping)
            productData.append('quantity', quantity)

            // console.log([...productData])

            const { data } = await axios.post("/product", productData)
            if(data?.error) {
                toast.error(data.error)
            } else {
                toast.success(`"${data.name}" is created`)
                navigate('/dashboard/admin/products')
            }
        } catch (err) {
            console.log(err)
            toast.error('Product create failed. Try again.')
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
                        <div className="p-3 mt-2 mb-2 bg-light h4">Create Products</div>
                        {photo && <div className="text-center">
                            <img 
                                src={URL.createObjectURL(photo)} 
                                alt="product photo" 
                                className="img img-responsive"
                                height='200px'
                            />                            
                        </div>}
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
                        />
                        <Select
                            placeholder='Select a category'
                            optionFilterProp="children"
                            onChange={(v) => setCategory(v)}
                            options={categories?.map(c => ({value: c._id, label: c.name}))}
                            className="col-12 mb-2"
                        />
                        <input 
                            type="number" 
                            min="1"
                            className="form-control p-2 mb-2" 
                            placeholder="Product quantity" 
                            value={quantity} 
                            onChange={e => setQuantity(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}