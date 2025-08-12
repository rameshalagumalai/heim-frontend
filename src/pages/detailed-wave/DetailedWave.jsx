import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { getCommentsByWaveId } from "../../api-calls/complements";
import { getDetailedWave } from "../../api-calls/waves";
import BottomNav from "../../components/BottomNav";
import LoadingWave from "../../components/LoadingWave";
import Navbar from "../../components/Navbar";
import Wave from "../../components/Wave";
import { auth } from "../../firebase/firebase";
import { getCount } from "../../utils/helpers";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import LoadingComment from "./LoadingComment";
import DeleteWaveModal from "../../modals/DeleteWaveModal";

export default function DetailedWave() {

    const { waveId } = useParams();
    const [user] = useAuthState(auth);

    const [loading, setLoading] = useState(true);
    const [wave, setWave] = useState({});
    const [error, setError] = useState('');
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [commentsCount, setCommentsCount] = useState(0);
    const [commentsError, setCommentsError] = useState('');

    useEffect(() => {
        async function getDetails() {
            const result = await getDetailedWave(user, waveId);

            if (result.id) {
                setWave(result);
                setCommentsCount(result.comments_count);
            } else {
                setWave(null);
                if (result.message) {
                    setError(result.message);
                } else {
                    setError('Network error');
                }
            }
            setLoading(false);
        }

        async function getComments() {
            const result = await getCommentsByWaveId(user, waveId);

            if (Array.isArray(result)) {
                if (result.length !== 0) {
                    setComments(result.reverse());
                } else {
                    setComments(null);
                    setCommentsError('No comments yet');
                }
            } else {
                setComments(null);
                if (result.message) {
                    setCommentsError(result.message);
                } else {
                    setCommentsError('Network error');
                }
            }
            setCommentsLoading(false);
        }

        getDetails();
        getComments();
    }, [user, waveId]);

    return (
        <div className="full-height d-flex justify-content-center overflow-auto page">
            <Navbar />
            {
                loading ?
                    <div className="col-11 col-lg-6 mt-5">
                        <LoadingWave />
                        <h3 className="mt-3 placeholder-glow"><span className="placeholder col-3"></span></h3>
                        <div className="row">
                            <div className="d-flex justify-content-center col-1">
                                <div style={{ width: '5px' }} className="h-100 bg-secondary"></div>
                            </div>
                            <div className="col-11">
                                <LoadingComment />
                                <LoadingComment />
                                <LoadingComment />
                            </div>
                        </div>
                    </div>
                    :
                    wave ?
                        <div className="col-11 col-lg-6 mt-5">
                            <Wave wave={wave} commentsCount={commentsCount} detailed={true} />
                            {
                                (user.uid === wave.user_id) && <DeleteWaveModal waveId={wave.id} detailed={true} />
                            }
                            <h3 className="mt-3 f-700">Comments <span className="text-secondary h4">{getCount(commentsCount)}</span></h3>
                            <CommentForm waveId={waveId} comments={comments} setComments={setComments} commentsCount={commentsCount} setCommentsCount={setCommentsCount} />
                            <div className="row">
                                <div className="d-flex justify-content-center col-1">
                                    <div style={{ width: '5px' }} className="h-100 bg-secondary"></div>
                                </div>
                                <div className="col-11">
                                    {
                                        commentsLoading ?
                                            <div>
                                                <LoadingComment />
                                                <LoadingComment />
                                            </div> :
                                            comments ?
                                                <Comments comments={comments} waveUserId={wave.user_id} setComments={setComments} commentsCount={commentsCount} setCommentsCount={setCommentsCount} /> : <h1>{commentsError}</h1>
                                    }
                                </div>
                            </div>
                        </div> :
                        <div className="full-height d-flex align-items-center justify-content-center">
                            <h1>{error}</h1>
                        </div>
            }
            <BottomNav />
        </div>
    );
}