import { useEffect, useState } from "react"
import { useAuth } from "../../context/auth"
import Jumbotron from "../../components/cards/jumbotron"
import AdminNavbar from "../../components/AdminNavbar"
import axios from "axios"
import { Select } from "antd"

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

    const onChange = (value) => {
        console.log(`selected ${value}`)
    }
    const onSearch = (value) => {
        console.log('search:', value)
    }

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

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
                        <Select
                            showSearch
                            placeholder='Select a category'
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={categories?.map(c => ({value: c.name, label: c.name}))}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}