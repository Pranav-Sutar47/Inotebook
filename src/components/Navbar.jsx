import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom'
import { showToast } from './ToastComponent';
import { CiLogin } from "react-icons/ci";
import { SiSimplelogin } from "react-icons/si";
import { IoIosLogOut } from "react-icons/io";

function NavbarComponent(props) {
    const navigate = useNavigate();
    const changeMode = () => {
        if (props.toggle === 'light') {
            showToast("Dark Mode Enabled", 'dark');
            document.body.style.backgroundColor = 'rgb(33 37 41)';
        }
        else {
            showToast('Light Mode Enabled', 'light');
            document.body.style.backgroundColor = 'white';
        }
        props.toggleMode();

    }

    const handleLogout = () =>{
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <>
            <Navbar expand={false} className="mb-3 sticky-top" bg={props.toggle === 'light' ? 'light' : 'dark'}
                data-bs-theme={props.toggle === 'light' ? 'light' : 'dark'}>
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">INoteBook</Navbar.Brand>
                    <div className="d-flex">
                        {props.toggle === 'light' ? <MdDarkMode className='size colorBk' onClick={changeMode} /> : <MdLightMode className='size colorWh' onClick={changeMode} />}
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
                    </div>
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-false`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-false`}
                        placement="end"
                    >
                        <Offcanvas.Header className={`bg-${props.toggle} text-${props.toggle === 'light' ? 'dark' : 'light'}`} closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                                INoteBook
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className={`bg-${props.toggle} text-${props.toggle === 'light' ? 'dark' : 'light'}`}>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/about">About</Nav.Link>
                                {!localStorage.getItem('token') ? (
                                <>
                                <Nav.Link as={Link} to="/login">
                                <CiLogin className='fs-5'/>
                                &nbsp;Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                <SiSimplelogin/>
                                &nbsp; Sign up
                                </Nav.Link> 
                                </>
                            ):
                                <Nav.Link as={Link} to="/signup" onClick={handleLogout}>
                                <IoIosLogOut/>
                                &nbsp; Log Out
                                </Nav.Link>
                                }
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarComponent;