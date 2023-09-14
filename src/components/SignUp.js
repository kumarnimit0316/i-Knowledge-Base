import React, { useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../conetxt/auths/authContext';
import AlertContext from '../conetxt/alert/alertContext';

const SignUp = () => {
    const { signUp } = useContext(AuthContext);
    const { showAlert } = useContext(AlertContext);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const cpasswordRef = useRef();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value === cpasswordRef.current.value) {
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            const name = nameRef.current.value;
            const res = await signUp({ email, name, password });
            if (res.success) {
                navigate('/login');
                showAlert({ type: "success", message: "Signup successful" });
            } else {
                showAlert({ type: "danger", message: "Signup Error" });
            }
        } else {
            showAlert({ type: "danger", message: "Password and Confirm password do not match" });
        }
        emailRef.current.value = '';
        passwordRef.current.value = '';
        cpasswordRef.current.value = '';
        nameRef.current.value = '';
    }

    return (
        <div className="container w-50 p-5">
            <h3>Create account to use KnowledegeBase</h3>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" ref={nameRef} minLength={3} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" ref={emailRef} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="desc" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" ref={passwordRef} minLength={5} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="desc" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="cpassword" ref={cpasswordRef} minLength={5} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
