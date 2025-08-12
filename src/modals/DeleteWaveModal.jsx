import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { deleteWaveById } from "../api-calls/waves";
import { auth } from "../firebase/firebase";

export default function DeleteWaveModal({ waveId, waves, setWaves, detailed }) {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const [submitted, setSubmitted] = useState(false);
    const [alert, setAlert] = useState('');

    async function handleDelete() {
        setSubmitted(true);
        alert !== "" && setAlert('');
        const response = await deleteWaveById(user, waveId);
        if (response === "Wave deleted") {
            if (detailed) {
                navigate(`/${user.uid}`)
            } else {
                setWaves(waves.filter((wave) => {
                    return (wave.id !== waveId);
                }));
            }
            document.getElementById('close-delete-wave-modal').click();
        } else {
            setAlert(response);
        }
        setSubmitted(false);
    }

    return (
        <div className="modal fade" id="deleteWaveModal" tabIndex="-1" role="dialog" aria-labelledby="deleteWaveModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content bg-bg">
                    <div className="modal-header">
                        <h3 className="f-700 mb-0" id="deleteWaveModalLabel">Delete wave</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {alert !== '' && <div className='alert alert-danger text-center' role="alert">
                            {alert}
                        </div>}
                        <p>Are you sure you want to delete this wave?</p>
                    </div>
                    <div className="modal-footer">
                        <button onClick={()=>setAlert('')} id="close-delete-wave-modal" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        {
                            submitted ?
                            <button className="btn btn-danger" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Deleting...
                            </button>
                            :
                            <button onClick={()=>handleDelete()} className="btn btn-danger">Delete</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}