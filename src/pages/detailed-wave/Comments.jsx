import { useState } from "react";
import DeleteCommentModal from "../../modals/DeleteCommentModal";
import Comment from "./Comment";

export default function Comments({ comments, setComments, commentsCount, setCommentsCount, waveUserId }) {

    const [deleteCommentId, setDeleteCommentId] = useState(0);

    return (
        <div>
            {
                comments.map((comment, i) => {
                    return <Comment key={i} comment={comment} waveUserId={waveUserId} setDeleteCommentId={setDeleteCommentId} />
                })
            }
            <DeleteCommentModal commentId={deleteCommentId} comments={comments} setComments={setComments} commentsCount={commentsCount} setCommentsCount={setCommentsCount} />
        </div>
    );
}