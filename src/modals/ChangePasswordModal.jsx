import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { validatePassword } from "../utils/helpers";

export default function ChangePasswordModal() {

    const [user] = useAuthState(auth);

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [alert, setAlert] = useState('');

    function handleInput(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        alert !== "" && setAlert('');
        setSubmitted(true);
        const { currentPassword, newPassword, confirmPassword } = formData;
        if (!validatePassword(newPassword)) {
            setAlert("Enter a strong password, make sure that your password contains atleast 1 lowercase letter, 1 uppercase letter, 1 numerical value, 1 special character and it consists of 8 to 16 characters");
            setSubmitted(false);
            return;
        }
        if (newPassword !== confirmPassword) {
            setAlert("Passwords don't match");
            setSubmitted(false);
            return;
        }
        await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, currentPassword))
            .then(() => {
                updatePassword(user, newPassword)
                    .then(() => {
                        setFormData({
                            currentPassword: "",
                            newPassword: "",
                            confirmPassword: ""
                        })
                        document.getElementById('close-change-password-modal').click();
                        setSubmitted(false);
                    })
                    .catch((err) => {
                        setAlert(err.message);
                        setSubmitted(false);
                    })
            })
            .catch((err) => {
                setAlert(err.message);
                setSubmitted(false);
            });
    }

    return (
        <div className="modal fade" id="changePasswordModal" tabIndex="-1" role="dialog" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <form onSubmit={e=>handleSubmit(e)} className="modal-content bg-bg">
                    <div className="modal-header">
                        <h3 className="f-700 mb-0" id="changePasswordModalLabel">Change password</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {alert !== '' && <div className='alert alert-danger text-center' role="alert">
                            {alert}
                        </div>}
                        <div className="input-group mb-3">
                            <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                            <input type="password" className="form-control" name="currentPassword" value={formData.currentPassword} onChange={e=>handleInput(e)} placeholder="Current password" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                            <input type="password" className="form-control" name="newPassword" value={formData.newPassword} onChange={e=>handleInput(e)} placeholder="New password" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                            <input type="password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={e=>handleInput(e)} placeholder="Confirm password" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button id="close-change-password-modal" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        {
                            submitted ?
                            <button className="btn btn-app text-white" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Changing...
                            </button>
                            :
                            <button type="submit" className="btn btn-app text-white">Change</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}