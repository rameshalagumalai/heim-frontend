import { useEffect, useState } from "react";
import { getVerificationCode, verifyEmail } from "../../api-calls/signup";

export default function Step2({ setStep, email }) {

    const [timeLeft, setTimeLeft] = useState(90);
    const [code, setCode] = useState('');
    const [alert, setAlert] = useState('');
    const [alertType, setAlertType] = useState('danger');
    const [submitted, setSubmitted] = useState(false);
    const [resendSubmitted, setResendSubmitted] = useState(false);
    const [over, setOver] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        alert !== "" && setAlert('');

        if (code.length !== 6) {
            setAlert("Invalid verification code");
            setSubmitted(false);
            return;
        }

        const response = await verifyEmail({email, code});
        if (response === "Email verified successfully") {
            setCode("");
            setStep(3);
        } else {
            alertType !== "danger" && setAlertType('danger');
            setAlert(response);
        }
        setSubmitted(false);
    }

    async function getVerificationCodeAgain() {
        alertType !== "danger" && setAlertType('danger');
        setResendSubmitted(true);
        const response = await getVerificationCode(email);
        switch (response) {
            case "Email sent successfully":
                setAlertType('success')
                setOver(false);
                setTimeLeft(90);
                break;
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
        setResendSubmitted(false);
    }

    useEffect(() => {
        while (timeLeft > 0) {
            const id = setInterval(() => setTimeLeft((oldCount) => oldCount - 1), 1000);

            return () => {
                clearInterval(id);
            };
        }

        setOver(true);
        alert !== "" && setAlert("");
    }, [timeLeft]);

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <p className="text-start">A six digit code has been sent to your registered email. Enter the code below before it expires in <span className="text-success">{timeLeft} seconds</span></p>
            {alert !== '' && <div className={`alert alert-${alertType}`} role="alert">
                {alert}
            </div>}
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-key"></i></span>
                <input type="number" value={code} onChange={e => setCode(e.target.value)} className="form-control" placeholder="6 digit code" />
            </div>
            {
                submitted ?
                    <button className="btn btn-app text-white form-control" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Please wait...
                    </button>
                    :
                    <button type="submit" className={`btn btn-app text-white form-control mb-3${over ? " disabled" : ""}`}>Next</button>
            }
            {
                resendSubmitted ?
                    <button className="btn text-app" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Please wait...
                    </button>
                    :
                    <button type="button" onClick={() => getVerificationCodeAgain()} className={`btn text-app${over ? "" : " disabled"}`}>Resend email</button>
            }
        </form>
    );
}