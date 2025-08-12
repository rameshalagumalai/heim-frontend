import { useState } from "react";
import { Link } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

export default function Signup() {

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');

    return (
        <div className="full-height d-flex align-items-center justify-content-center overflow-auto">
            <div className="col-10 col-lg-3 text-center border rounded py-4 px-3">
                <h1 className="f-700 large-text text-app mb-1">Heim</h1>
                <h3 className="text-secondary f-700 mb-3">Sign up</h3>
                {/* <div id="carouselExampleControls" className="carousel slide">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <Step1 />
                        </div>
                        <div className="carousel-item">
                            <Step2 />
                        </div>
                        <div className="carousel-item">
                            <Step3 />
                        </div>
                    </div>
                    <button id="signup-next" className="carousel-control-next d-none" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button> 
                </div> */}
                    {
                        step === 1 ? <Step1 setStep={setStep} email={email} setEmail={setEmail} />:
                        step === 2 ? <Step2 setStep={setStep} email={email} />:
                        <Step3 email={email} />
                    }
                <div className="d-flex mt-4">
                    <Link to='/login'>Back to login</Link>
                </div>
            </div>
        </div>
    );
}