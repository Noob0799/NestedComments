import { useEffect, useState } from "react";

const useCommentTree = () => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const commentsList = localStorage.getItem("comments");
    if (comments) {
      setComments(JSON.parse(commentsList));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [JSON.parse(JSON.stringify(comments))]);
  const addCommentUtil = (parentCommentId, newComment, comment) => {
    if (parentCommentId == comment.id) {
      comment.replies = [
        ...comment.replies,
        {
          id: new Date().getTime(),
          message: newComment,
          likes: 0,
          dislikes: 0,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          replies: [],
        },
      ];
    } else {
      comment.replies.forEach((reply) => {
        addCommentUtil(parentCommentId, newComment, reply);
      });
    }
  };
  const addComment = (parentCommentId, newComment) => {
    const commentsArr = [...comments];
    if (parentCommentId) {
      commentsArr.forEach((comment) => {
        addCommentUtil(parentCommentId, newComment, comment);
      });
      setComments(JSON.parse(JSON.stringify(commentsArr)));
    } else {
      setComments([
        {
          id: new Date().getTime(),
          message: newComment,
          likes: 0,
          dislikes: 0,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          replies: [],
        },
        ...commentsArr,
      ]);
    }
  };
  const editCommentUtil = (comments, commentId, newComment) => {
    const index = comments.findIndex((comment) => commentId == comment.id);
    if (index >= 0) {
      comments.forEach((comment) => {
        if (commentId == comment.id) {
          comment.message = newComment;
        }
      });
    } else {
      comments.forEach((comment) =>
        editCommentUtil(comment.replies, commentId, newComment)
      );
    }
  };
  const editComment = (newComment, commentId) => {
    const commentsArr = [...comments];
    editCommentUtil(commentsArr, commentId, newComment);
    setComments([...commentsArr]);
  };
  const deleteCommentUtil = (comments, commentId) => {
    const index = comments.findIndex((comment) => commentId == comment.id);
    if (index >= 0) {
      comments.splice(index, 1);
    } else {
      comments.forEach((comment) =>
        deleteCommentUtil(comment.replies, commentId)
      );
    }
  };
  const deleteComment = (commentId) => {
    const commentsArr = [...comments];
    deleteCommentUtil(commentsArr, commentId);
    setComments([...commentsArr]);
  };
  const upVoteUtil = (comments, commentId) => {
    const index = comments.findIndex((comment) => commentId == comment.id);
    if (index >= 0) {
      comments.forEach((comment) => {
        if (commentId == comment.id) {
          comment.likes += 1;
        }
      });
    } else {
      comments.forEach((comment) => upVoteUtil(comment.replies, commentId));
    }
  };
  const upVote = (commentId) => {
    const commentsArr = [...comments];
    upVoteUtil(commentsArr, commentId);
    setComments(commentsArr);
  };
  const downVoteUtil = (comments, commentId) => {
    const index = comments.findIndex((comment) => commentId == comment.id);
    if (index >= 0) {
      comments.forEach((comment) => {
        if (commentId == comment.id) {
          comment.dislikes += 1;
        }
      });
    } else {
      comments.forEach((comment) => downVoteUtil(comment.replies, commentId));
    }
  };
  const downVote = (commentId) => {
    const commentsArr = [...comments];
    downVoteUtil(commentsArr, commentId);
    setComments(commentsArr);
  };
  return {
    comments,
    addComment,
    editComment,
    deleteComment,
    upVote,
    downVote
  };
};

export default useCommentTree;
