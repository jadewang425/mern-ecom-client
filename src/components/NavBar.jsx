import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
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
        navigate("/login")
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
                            <NavDropdown title={auth?.user?.name} id="basic-nav-dropdown">
                                <NavLink className='nav-link' to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>
                                    Dashboard
                                </NavLink>
                                <NavLink className='nav-link' to={'/dashboard/wishlist'}>Wishlist</NavLink>
                                <NavLink onClick={logout} className='nav-link'>Logout</NavLink>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}