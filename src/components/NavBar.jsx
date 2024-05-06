import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth';


export default function NavBar() {
    const [ auth, setAuth ] = useAuth()
    const navigate = useNavigate()

    const logout = () => {
        // update context so data removes from homepage
        setAuth({ ...auth, user: null, token: "" })
        localStorage.removeItem("auth")
        navigate('/login')
    }
    
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">NavBar</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className='nav-link' to='/'>Home</NavLink>
                        {!auth?.user  ? (
                            <>
                                <NavLink className='nav-link' to='/login'>Login</NavLink>
                                <NavLink className='nav-link' to='/register'>Register</NavLink>
                            </>
                        ) : (
                            <NavLink className='nav-link' onClick={logout}>Logout</NavLink>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}