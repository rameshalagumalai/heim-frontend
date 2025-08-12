import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewUser } from "../../api-calls/signup";
import { checkAge, validateDate, validatePassword, validateUserId } from "../../utils/helpers";

export default function Step3({ email }) {

    const navigate = useNavigate();

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() - 18;
    const maxDate = `${year}-${((month<10) ? "0" : "") + month}-${((day<10) ? "0" : "") + day}`;

    const [data, setData] = useState({
        userId: '',
        name: '',
        email: email,
        dateOfBirth: '',
        password: '',
        confirmPassword: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [alert, setAlert] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        alert !== "" && setAlert('');

        const { userId, name, dateOfBirth, password, confirmPassword } = data;

        if (name === "") {
            setAlert("Invalid name");
            setSubmitted(false);
            return;
        }

        if (!validateUserId(userId)) {
            setAlert("Invalid user id, make sure that your user id contains only alphabets, numbers _ and .s, and they don't begin with a number");
            setSubmitted(false);
            return;
        }

        if (!validateDate(dateOfBirth)) {
            setAlert("Invalid date");
            setSubmitted(false);
            return;
        }

        if (!checkAge(dateOfBirth)) {
            setAlert("You're young to enter Heim now, come back after you grow buddy");
            setSubmitted(false);
            return;
        }

        if (!validatePassword(password)) {
            setAlert("Enter a strong password, make sure that your password contains atleast 1 lowercase letter, 1 uppercase letter, 1 numerical value, 1 special character and it consists of 8 to 16 characters");
            setSubmitted(false);
            return;
        }

        if (password !== confirmPassword) {
            setAlert("Passwords don't match");
            setSubmitted(false);
            return;
        }

        const response = await addNewUser(data);
        if (response === "Account created successfully") {
            setData({
                userId: '',
                name: '',
                email: email,
                dateOfBirth: '',
                password: '',
                confirmPassword: ''
            });
            navigate('/login');
        } else {
            setAlert(response);
        }
        setSubmitted(false);
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            {alert !== '' && <div className={`alert alert-danger`} role="alert">
                {alert}
            </div>}
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-user"></i></span>
                <input type="text" className="form-control" value={data.name} name='name' onChange={e => setData({ ...data, [e.target.name]: e.target.value })} placeholder="Name" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-id-badge"></i></span>
                <input type="text" className="form-control" value={data.userId} name='userId' onChange={e => setData({ ...data, [e.target.name]: e.target.value })} placeholder="User ID" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-calendar"></i></span>
                <input type="date" max={maxDate} className="form-control" value={data.dateOfBirth} name='dateOfBirth' onChange={e => setData({ ...data, [e.target.name]: e.target.value })} placeholder="Date of birth" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                <input type="password" className="form-control" value={data.password} name='password' onChange={e => setData({ ...data, [e.target.name]: e.target.value })} placeholder="Password" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                <input type="password" className="form-control" value={data.confirmPassword} name='confirmPassword' onChange={e => setData({ ...data, [e.target.name]: e.target.value })} placeholder="Confirm password" />
            </div>
            {
                submitted ?
                    <button className="btn btn-app text-white form-control" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Creating account...
                    </button>
                    :
                    <button type="submit" className="btn btn-app text-white form-control">Done</button>
            }
        </form>
    );
}