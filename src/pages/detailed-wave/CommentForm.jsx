import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { newComment } from "../../api-calls/complements";
import { useAppUser } from "../../context/AppUserContext";
import { auth } from "../../firebase/firebase";

export default function CommentForm({ waveId, comments, setComments, commentsCount, setCommentsCount }) {

    const [user] = useAuthState(auth);

    const [content, setContent] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [alert, setAlert] = useState('');

    const { appUser } = useAppUser();

    async function handleSubmit(e) {
        e.preventDefault();
        alert !== "" && setAlert('');
        setSubmitted(true);
        const response = await newComment(user, { content, waveId });
        if (response.message === "Comment added successfully") {
            const comment = {
                id: response.id,
                user_id: user.id,
                name: appUser.name,
                verified: appUser.verified,
                app_user_id: appUser.app_user_id,
                content: content,
                instance: new Date()
            };
            if (comments === null) {
                comments = [];
            }
            setComments([comment, ...comments]);
            setCommentsCount(commentsCount+1)
            setContent('');
        } else {
            setAlert(response);
        }
        setSubmitted(false);
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            {alert !== '' && <div className='alert alert-danger text-center' role="alert">
                {alert}
            </div>}
            <div className="input-group mb-3">
                <input type="text" value={content} onChange={e => setContent(e.target.value)} className="form-control" placeholder="Add your comment here" />
                {
                    submitted ?
                        <button className="btn btn-app text-white" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Adding...
                        </button>
                        :
                        <button className="btn btn-app text-white" type="submit">Add</button>
                }
            </div>
        </form>
    );
}