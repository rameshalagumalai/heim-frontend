import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { addStar, removeStar } from "../api-calls/complements";
import { auth } from "../firebase/firebase";
import { getCount } from "../utils/helpers";

export default function WaveComplements({ id, waveStarred, waveStars, setWaveStars, name, waveComments }) {

    const [user] = useAuthState(auth);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [starred, setStarred] = useState(waveStarred);

    async function star() {
        setLoading(true);
        const result = await addStar(user, id);

        if (result === "Starred successfully") {
            setWaveStars(waveStars + 1);
            setStarred(1);
        }
        setLoading(false);
    }

    async function unStar() {
        setLoading(true);
        const result = await removeStar(user, id);

        if (result === "Unstarred successfully") {
            setWaveStars(waveStars - 1);
            setStarred(0);
        }
        setLoading(false);
    }

    async function sendWave() {
        await navigator.share({
            text: `Take a look at this wave from ${name}`,
            url: `http://localhost:3000/waves/${id}`
        })
        .then((value) => {
            alert("Success");
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    return (
        <div>
            {
                loading ?
                    <button className="btn btn-lg col-4" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </button> :
                    starred ?
                        <button onClick={() => unStar()} className="btn btn-lg col-4">
                            <i className="text-warning fa-solid fa-star"></i> <span className="h6 text-secondary medium-text">{getCount(waveStars)}</span>
                        </button> :
                        <button onClick={() => star()} className="btn btn-lg col-4">
                            <i className="fa-regular text-color fa-star"></i> <span className="h6 text-secondary medium-text">{getCount(waveStars)}</span>
                        </button>
            }
            <button onClick={()=>navigate(`/waves/${id}`)} className="btn btn-white btn-lg col-4">
                <i className="fa-regular text-color fa-comment"></i> <span className="h6 text-secondary medium-text">{getCount(waveComments)}</span>
            </button>
            <button onClick={() => sendWave()} className="btn btn-white btn-lg col-4">
                <i className="fa-regular text-color fa-share-from-square"></i>
            </button>
        </div>
    )
}