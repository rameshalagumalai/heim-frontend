import { useState } from "react";
import { getVerificationCode } from "../../api-calls/signup";
import { validateEmail } from "../../utils/helpers";

export default function Step1({ setStep, email, setEmail }) {

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

        const response = await getVerificationCode(email);
        switch (response) {
            case "Email sent successfully":
                setStep(2);
                setSubmitted(false);
                return;
            case "Please wait for the given time before you request another code":
                setAlertType('warning');
                break;
            case "Email already verified":
                setStep(3);
                break;
            case "Insufficient data":
                break;
            case "Invalid email":
                break;
            case "Email already in use":
                break;
            default:
                setAlert("Something went wrong");
        }
        setAlert(response);
        setSubmitted(false);
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            {alert !== '' && <div className={`alert alert-${alertType}`} role="alert">
                {alert}
            </div>}
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-envelope"></i></span>
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