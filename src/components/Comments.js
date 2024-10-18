import Comment from "./Comment";

const Comments = ({ comments }) => {
  return (
    <div className="comments-container">
      {comments.map((comment, idx) => (
        <Comment comment={comment} key={idx} />
      ))}
    </div>
  );
};

export default Comments;
