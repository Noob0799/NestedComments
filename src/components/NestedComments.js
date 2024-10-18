import { useState } from "react";
import { CommentTreeContext } from "../context/CommentTree";
import Comments from "./Comments";
import useCommentTree from "../hooks/CommentTree";

const NestedComments = () => {
  const [newComment, setNewComment] = useState("");
  const { comments, addComment, editComment, deleteComment, upVote, downVote } = useCommentTree();
  const handleChange = (event) => {
    setNewComment(event.target.value);
  };
  const handleAddComment = () => {
    addComment(null, newComment);
    setNewComment("");
  };
  return (
    <>
      <header>
        <h1>Nested Comments</h1>
      </header>
      <div className="enter-comment-container">
        <textarea
          placeholder="Enter new comment..."
          value={newComment}
          onChange={handleChange}
        />
        <button className="add-first-comment-btn" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>
      <CommentTreeContext.Provider value={{ addComment, editComment, deleteComment, upVote, downVote }}>
        <Comments comments={comments} />
      </CommentTreeContext.Provider>
    </>
  );
};

export default NestedComments;
