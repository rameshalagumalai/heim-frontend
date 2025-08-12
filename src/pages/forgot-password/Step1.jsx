import { useState } from "react";
import { validateEmail } from "../../utils/helpers";
import { auth} from "../../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function Step1({ email, setEmail }) {

    const [alert, setAlert] = useState('');
    const [alertType, setAlertType] = useState('danger');
    const [submitted, setSubmitted] = useState(false);
    
    async function handleSubmit(e) {
        e.preventDefault();
        alert !== "" && setAlert('');
        alertType !== "danger" && setAlertType('danger');
        setSubmitted(true);

        if (!validateEmail(email)) {
            setAlert("Invalid email");
            setSubmitted(false);
            return;
        }

        await sendPasswordResetEmail(auth, email)
            .then(() => {
                setAlertType("success");
                setAlert("Email sent successfully, set a strong password as per Heim norms else you wont't be able to sign in");
            })
            .catch((err) => {
                switch(err.message) {
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
            });
        
        setSubmitted(false);
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            {alert !== '' && <div className={`alert alert-${alertType}`} role="alert">
                {alert}
            </div>}
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-user"></i></span>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Email" />
            </div>
            {
                submitted ?
                    <button className="btn btn-app text-white form-control" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Please wait...
                    </button>
                    :
                    <button type="submit" className="btn btn-app text-white form-control">Next</button>
            }
        </form>
    );
}