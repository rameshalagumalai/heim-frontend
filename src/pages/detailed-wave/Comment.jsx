import UserPrimaryData from "../../components/UserPrimaryData";
import { getFormattedDate, getProcessedWave } from "../../utils/helpers";
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Comment({ comment, waveUserId, setDeleteCommentId }) {

    const [user] = useAuthState(auth)

    const { id, user_id, name, verified, app_user_id, content, instance } = comment;

    return (
        <div className="border rounded p-3 mb-1">
            <div className="d-flex align-items-center">
                <UserPrimaryData id={user_id} name={name} verified={verified} appUserId={app_user_id} />
                {(user.uid === user_id || user.uid === waveUserId) &&
                    <button onClick={() => setDeleteCommentId(id)} className="btn btn-sm text-color ms-auto" data-bs-toggle="modal" data-bs-target="#deleteCommentModal"><i className="fa-solid fa-trash"></i></button>
                }
            </div>
            <p className="my-2" dangerouslySetInnerHTML={{ __html: getProcessedWave(content) }}></p>
            <p className="text-secondary mb-0 small-text">{getFormattedDate(instance)}</p>
            {/* <div className="d-flex">
                <button className="btn btn-white btn-lg col-6">
                    <i className="text-danger fa-solid fa-heart"></i> <span className="h6 text-secondary">2.3k</span>
                </button>
                <button className="btn btn-white btn-lg col-4">
                    <i className="fa-regular fa-comment"></i> <span className="h6 text-secondary">1k</span>
                </button>
            </div> */}
        </div>
    );
}