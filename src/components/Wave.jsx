import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { getFormattedDate, getProcessedWave } from "../utils/helpers";
import UserPrimaryData from "./UserPrimaryData";
import WaveComplements from "./WaveComplements";

export default function Wave({ wave, commentsCount, detailed, setDeleteWaveId }) {

    const [user] = useAuthState(auth);

    const { id, user_id, name, verified, app_user_id, content, instance, starred, stars } = wave;
    var preFinalContent;

    const [waveStars, setWaveStars] = useState(stars);

    if (detailed || content.length <= 146) {
        preFinalContent = content;
    } else {
        preFinalContent = content.substr(0, 147) + `<a href='/waves/${id}' className='text-app'> ...read more</a>`
    }

    return (
        <div className="border rounded p-3 mt-3">
            <div className="d-flex align-items-center">
                <UserPrimaryData id={user_id} name={name} verified={verified} appUserId={app_user_id} />
                {user.uid === user_id &&
                        <button onClick={!detailed ? () => setDeleteWaveId(id) : () => {}} className="btn btn-sm text-color ms-auto" data-bs-toggle="modal" data-bs-target="#deleteWaveModal"><i className="fa-solid fa-trash"></i></button>
                }
            </div>
            <p className="mt-3" dangerouslySetInnerHTML={{ __html: getProcessedWave(preFinalContent) }}></p>
            <div className="d-flex">
                <p className="text-secondary mb-0 small-text">{getFormattedDate(instance)}</p>
                {waveStars !== 0 && <Link className="ms-auto small-text" to={`/waves/${id}/stars`}>View stars</Link>}
            </div>
            <WaveComplements id={id} waveStarred={starred} waveStars={waveStars} setWaveStars={setWaveStars} waveComments={commentsCount} />
        </div>
    );
}