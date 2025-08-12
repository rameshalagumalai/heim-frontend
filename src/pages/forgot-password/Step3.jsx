import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Step3() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [alert, setAlert] = useState('');

    return (
        <form>
            {alert !== '' && <div className={`alert alert-danger`} role="alert">
                {alert}
            </div>}
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                <input type="password" className="form-control" placeholder="New password" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                <input type="password" className="form-control" placeholder="Confirm password" />
            </div>
            <button type="submit" className="btn btn-app text-white form-control">Done</button>
        </form>
    );
}