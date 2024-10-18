import { useContext, useState } from "react";
import { CommentTreeContext } from "../context/CommentTree";
import Comment from "./Comment";

const Replies = ({ replies, commentId }) => {
  const [newReply, setNewReply] = useState("");
  const { addComment } = useContext(CommentTreeContext);
  const handleChange = (event) => {
    setNewReply(event.target.value);
  };
  const handleAddReply = () => {
    addComment(commentId, newReply);
    setNewReply("");
  };
  return (
    <div className="replies-container">
      <div className="reply-container">
        <input
          type="text"
          className="reply-input"
          placeholder="Enter reply..."
          value={newReply}
          onChange={handleChange}
        />
        <button className="add-reply-btn" onClick={handleAddReply}>
          Reply
        </button>
      </div>
      {replies.map((reply, idx) => (
        <Comment comment={reply} key={idx} />
      ))}
    </div>
  );
};

export default Replies;
