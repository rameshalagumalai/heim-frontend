import { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase.js';
import { validateEmail, validatePassword } from "../../utils/helpers.js";

export default function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [submitted, setSubmitted] = useState(false);
    const [alert, setAlert] = useState("");

    function handleInput(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        alert !== "" && setAlert('');
        setSubmitted(true);

        const { email, password } = formData;

        if (!validateEmail(email)) {
            setAlert('Invalid email');
            setSubmitted(false);
            return;
        }

        if (!validatePassword(password)) {
            setAlert("Enter a strong password, make sure that your password contains atleast 1 lowercase letter, 1 uppercase letter, 1 numerical value, 1 special character and it consists of 8 to 16 characters");
            setSubmitted(false);
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setFormData({
                    email: "",
                    password: ""
                });
            })
            .catch((err) => {
                switch(err.message) {
                    case 'Firebase: Error (auth/wrong-password).':
                        setAlert('Wrong password');
                        break;
                    case 'Firebase: Error (auth/user-not-found).':
                        setAlert('User not found');
                        break;
                    case 'Firebase: Error (auth/invalid-email).':
                        setAlert('Invalid email');
                        break;
                    case 'Firebase: Error (auth/network-request-failed).':
                        setAlert('Netword error');
                        break;       
                    case 'Firebase: Error (auth/internal-error).':
                        setAlert('Login unsuccessful');
                        break;        
                    default:
                        setAlert(err.message);    
                }
            })
            .finally(() => {
                setSubmitted(false);
            })
    }

    return (
        <div className="full-height d-flex align-items-center justify-content-center overflow-auto">
            <form onSubmit={e=>handleSubmit(e)} className="col-10 col-lg-3 text-center border rounded py-4 px-3">
                <h1 className="f-700 large-text text-app mb-1">Heim</h1>
                <h3 className="text-secondary f-700 mb-3">Sign in</h3>
                {alert !== '' && <div className={`alert alert-danger`} role="alert">
                    {alert}
                </div>}
                <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fa-solid fa-envelope"></i></span>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={e=>handleInput(e)} placeholder="User ID or email" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                    <input type="password" className="form-control" name="password" value={formData.password} onChange={e=>handleInput(e)} placeholder="Password" />
                </div>
                {
                    submitted ?
                    <button className="btn btn-app text-white form-control" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Signing in...
                    </button>
                    :
                    <button type="submit" className="btn btn-app text-white form-control">Sign in</button>
                }
                <div className="d-flex mt-4">
                    <Link to='/forgot-password'>Forgot password?</Link>
                    <Link className="ms-auto" to='/signup'>New user?</Link>
                </div>
            </form>
        </div>
    );
}
