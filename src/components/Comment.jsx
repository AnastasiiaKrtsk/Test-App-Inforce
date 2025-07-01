import React from 'react';

export const Comment = ({ comment, onDelete }) => {
  return (
    <div className="comment-container">
      <span className="text-comment">{comment}</span>
      <button onClick={onDelete} className="btn-delete">
        Delete
      </button>
    </div>
  );
};

export default Comment;
