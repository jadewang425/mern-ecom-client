export default function Jumbotron(props) {
    // set subtitle to default
    const { title, subTitle="Welcome to React E-commerce" } = props
    return (
        <div className="container-fluid bg-secondary">
            <div className="row">
                <div className="col text-center p-5 bg-light">
                    <h1>{title}</h1>
                    <p className="lead">{subTitle}</p>
                </div>
            </div>
        </div>
    )
}