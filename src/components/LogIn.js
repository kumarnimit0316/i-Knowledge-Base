import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../conetxt/auths/authContext';
import AlertContext from '../conetxt/alert/alertContext';

const LogIn = () => {
    const { logIn } = useContext(AuthContext);
    const { showAlert } = useContext(AlertContext);
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const res = await logIn({ email, password });
        if (res.success) {
            localStorage.setItem('token', res.authtoken);
            localStorage.setItem('id', res.id);
            navigate('/');
            showAlert({ type: "success", message: "Login successful" });
        } else {
            showAlert({ type: "danger", message: "Login error" });
        }
        emailRef.current.value = '';
        passwordRef.current.value = '';
    }

    return (
        <div className="container w-50 p-5">
            <h3>LogIn to continue to KnowledgeBase</h3>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" ref={emailRef} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="desc" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" ref={passwordRef} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Log In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LogIn;
