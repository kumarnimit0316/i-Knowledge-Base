import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertContext from '../conetxt/alert/alertContext';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { showAlert } = useContext(AlertContext);
    useEffect(() => {
        console.log(location.pathname);
    }, [location]);
    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        navigate('/login');
        showAlert({ type: "success", message: "Loggedout successful" });
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">KnowledgeBase</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} aria-current="page" to="/about">About</Link>
                            </li>
                            {localStorage.getItem('token') && <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/ownArticle' ? "active" : ""}`} aria-current="page" to="/ownArticle">Own Article</Link>
                            </li>}
                            {localStorage.getItem('token') && <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/addArticle' ? "active" : ""}`} aria-current="page" to="/addArticle">Add Article</Link>
                            </li>}
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex">
                            <Link className={`${location.pathname === '/login' ? "d-none" : ""} btn btn-primary mx-1`} aria-current="page" to="/login">LogIn</Link>
                            <Link className={`${location.pathname === '/signup' ? "d-none" : ""} btn btn-primary mx-1`} aria-current="page" to="/signup">SignUp</Link>
                        </form> : <button onClick={handleLogOut} className='btn btn-primary mx-1'>LogOut</button>}

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
