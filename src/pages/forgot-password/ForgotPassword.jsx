import Step2 from "./Step2";
import Step1 from "./Step1";
import Step3 from "./Step3";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ForgotPassword() {
    
    const [email, setEmail] = useState("");

    return (
        <div className="full-height d-flex align-items-center justify-content-center overflow-auto">
            <div className="col-10 col-lg-3 text-center border rounded py-4 px-3">
                <h1 className="f-700 large-text text-app mb-1">Heim</h1>
                <h3 className="text-secondary f-700 mb-3">Forgot password</h3>
                <Step1 email={email} setEmail={setEmail} />
                <div className="d-flex mt-4">
                    <Link to='/login'>Back to login</Link>
                </div>
            </div>
        </div>
    );
}