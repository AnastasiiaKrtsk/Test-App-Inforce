import React from 'react';
import '../styles/ProductModal.scss';

export const DeleteModal = ({ onDelete, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Confirm delete this item?</h2>
        <div className="modal-buttons">
          <button className="btn btn-primary" onClick={onDelete}>
            Delete
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
