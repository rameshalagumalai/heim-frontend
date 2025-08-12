import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { newWave } from "../../api-calls/waves";
import BottomNav from "../../components/BottomNav";
import Navbar from "../../components/Navbar";
import { auth } from "../../firebase/firebase";

export default function NewWave() {

    const [user] = useAuthState(auth);

    const [content, setContent] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [alert, setAlert] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        alert !== "" && setAlert('');
        setSubmitted(true);
        const response = await newWave(user, { content });
        if (response === "Wave added successfully") {
            setContent("");
            navigate(`/${user.uid}`);
        } else {
            setAlert(response);
        }
        setSubmitted(false);
    }

    return (
        <div className="full-height d-flex justify-content-center overflow-auto">
            <Navbar />
            <form onSubmit={e => handleSubmit(e)} className="col-11 col-lg-6 mt-5 pt-3 ">
                <h1 className="f-700">New wave</h1>
                {alert !== '' && <div className='alert alert-danger text-center' role="alert">
                    {alert}
                </div>}
                <textarea className="form-control h-25" value={content} onChange={e => setContent(e.target.value)} placeholder="Write what's on your mind, add hashtags to embrace the topic" />
                <div className="mt-3 d-flex">
                    {
                        submitted ?
                            <button className="ms-auto btn btn-app text-white" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Sharing...
                            </button>
                            :
                            <button type="submit" className="ms-auto btn btn-app text-white">Share</button>
                    }
                </div>
            </form>
            <BottomNav />
        </div>
    );
}