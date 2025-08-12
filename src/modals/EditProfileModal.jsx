import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { editProfileDetails } from "../api-calls/profile";
import { useAppUser } from "../context/AppUserContext";
import { auth } from "../firebase/firebase";

export default function EditProfileModal() {
    
    const [user] = useAuthState(auth);

    const { appUser, setAppUser } = useAppUser();

    const day = parseInt(appUser.date_of_birth.substr(8, 10));

    const date = new Date();
    const today = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() - 18;
    const maxDate = `${year}-${((month<10) ? "0" : "") + month}-${((day<10) ? "0" : "") + today}`;

    const [formData, setFormData] = useState({
        name: appUser.name,
        appUserId: appUser.app_user_id,
        intro: appUser.intro,
        dateOfBirth: appUser.date_of_birth.substr(0, 8) + (((day+1) < 10) ? '0' : '') + (day+1),
        residence: appUser.residence
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
        const response = await editProfileDetails(user, formData);
        if (response === "Profile updated successfully") {
            const { name, appUserId, intro, dateOfBirth, residence } = formData;
            setAppUser({...appUser, name, app_user_id: appUserId, intro, date_of_birth: new Date(dateOfBirth).toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric" }), residence})
            document.getElementById('close-edit-profile-modal').click();
        } else {
            setAlert(response);
        }
        setSubmitted(false);
    }

    return (
        <div className="modal fade" id="editProfileModal" tabIndex="-1" role="dialog" aria-labelledby="editProfileModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <form onSubmit={e=>handleSubmit(e)} className="modal-content bg-bg">
                    <div className="modal-header">
                        <h3 className="f-700 mb-0" id="editProfileModalLabel">Edit profile</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {alert !== '' && <div className='alert alert-danger text-center' role="alert">
                            {alert}
                        </div>}
                        <div className="input-group mb-3">
                            <span className="input-group-text"><i className="fa-solid fa-user"></i></span>
                            <input type="text" className="form-control" name="name" value={formData.name} onChange={e=>handleInput(e)} placeholder="Name" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text"><i className="fa-solid fa-id-badge"></i></span>
                            <input type="text" className="form-control" name="appUserId" value={formData.appUserId} onChange={e=>handleInput(e)} placeholder="User name" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text"><i className="fa-solid fa-star"></i></span>
                            <textarea className='form-control' name="intro" value={formData.intro} onChange={e=>handleInput(e)} placeholder='Intro'></textarea>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text"><i className="fa-solid fa-cake-candles"></i></span>
                            <input type="date" max={maxDate} className="form-control" name="dateOfBirth" value={formData.dateOfBirth} onChange={e=>handleInput(e)} placeholder="Date of birth" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text"><i className="fa-solid fa-location-dot"></i></span>
                            <input type="text" className="form-control" name="residence" value={formData.residence} onChange={e=>handleInput(e)} placeholder="Place of residence" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button id="close-edit-profile-modal" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        {
                            submitted ?
                            <button className="btn btn-app text-white" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Saving changes...
                            </button>
                            :
                            <button type="submit" className="btn btn-app text-white">Save changes</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}