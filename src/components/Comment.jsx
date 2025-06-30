// src/components/Comment.jsx
import React from 'react';

function Comment({ comment, onDelete }) {
  return (
    <div className="comment flex justify-between items-center p-2 border-b">
      <span>{comment.text}</span>
      <button
        onClick={onDelete}
        className="text-red-500 hover:underline text-sm"
      >
        Delete
      </button>
    </div>
  );
}

export default Comment;
