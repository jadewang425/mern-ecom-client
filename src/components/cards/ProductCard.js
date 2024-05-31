// import moment from "moment"
import { Badge } from "antd"

export default function ProductCard({ p }) {
    return (
        <div className="card mb-3 product-card">
            <Badge.Ribbon text={`${p.sold} sold`} color="red">
                <Badge.Ribbon text={`${p?.quantity >= 1 ? 'In Stock' : 'Sold Out'}`} placement="start">
                    <img 
                        className="card-img-top"
                        src={`${process.env.REACT_APP_API}/product/photo/${p._id}`} 
                        alt={p.name} 
                        style={{height: '300px', objectFit: 'cover'}} 
                    />
                </Badge.Ribbon>
            </Badge.Ribbon>
            <div className="card-body">
                <h5>{p?.name}</h5>

                <h4 className="fw-bold">
                    {p?.price?.toLocaleString("en-US", {
                        style: 'currency',
                        currency: "USD",
                    })}
                    </h4>
                <p className="card-text">{p?.description.substring(0, 60)}...</p>
            </div>

            <div className="d-flex justify-content-between">
                <button className="btn btn-primary col" style={{borderRadius: '0px', borderBottomLeftRadius: '5px'}}>
                    View Product
                </button>
                <button className="btn btn-outline-primary col" style={{borderRadius: '0px', borderBottomRightRadius: '5px'}}>
                    Add to Cart
                </button>
            </div>
            {/* <p>{moment(p.createdAt).fromNow()}</p>
            <p>{p.sold} sold</p> */}
        </div>
    )
}