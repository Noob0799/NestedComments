import Replies from "./Replies";
import { useState, useContext } from "react";
import { CommentTreeContext } from "../context/CommentTree";

const Comment = ({ comment }) => {
  const [showReply, setShowReply] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editCommentMsg, setEditCommentMsg] = useState("");
  const { editComment, deleteComment, upVote, downVote } = useContext(CommentTreeContext);
  const handleShowReply = () => {
    setShowReply(!showReply);
  };
  const handleEditComment = () => {
    setIsEditMode(true);
    setEditCommentMsg(comment.message);
  };
  const handleEditMsgChange = (event) => {
    setEditCommentMsg(event.target.value);
  };
  const handleSaveComment = (commentId) => {
    editComment(editCommentMsg, commentId);
    setEditCommentMsg("");
    setIsEditMode(false);
  };
  const handleUpVote = (commentId) => {
    upVote(commentId);
  };
  const handleDownVote = (commentId) => {
    downVote(commentId);
  };
  return (
    <>
      <div className="comment-card">
        {isEditMode ? (
          <div className="reply-container">
            <input
              type="text"
              className="reply-input"
              value={editCommentMsg}
              onChange={handleEditMsgChange}
            />
            <button
              className="add-reply-btn"
              onClick={() => handleSaveComment(comment.id)}
            >
              Save
            </button>
          </div>
        ) : (
          <p>{comment.message}</p>
        )}
        <p>
          {comment.likes} 👍 {comment.dislikes} 👎
        </p>
        <p>
          Date: {comment.date} Time: {comment.time}
        </p>
        <div className="action-btn-container">
          <button
            className="action-btn"
            onClick={() => handleUpVote(comment.id)}
          >
            Upvote 👍
          </button>
          <button
            className="action-btn"
            onClick={() => handleDownVote(comment.id)}
          >
            Downvote 👎
          </button>
          <button className="action-btn" onClick={handleShowReply}>
            {showReply ? "Hide Replies" : "Reply"}
          </button>
          {!isEditMode && (
            <button className="action-btn" onClick={handleEditComment}>
              Edit
            </button>
          )}
          <button
            className="action-btn"
            onClick={() => deleteComment(comment.id)}
          >
            Delete
          </button>
        </div>
      </div>
      {showReply && (
        <Replies replies={comment.replies} commentId={comment.id} />
      )}
    </>
  );
};

export default Comment;
