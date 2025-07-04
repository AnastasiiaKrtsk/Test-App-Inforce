import React from 'react';
import '../styles/ProductModal.scss';

export const ProductModal = ({ onClose, onSubmit }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Add item on mockapi.io</h2>
        <div className="modal-buttons">
          <button className="btn btn-primary" onClick={onSubmit}>
            Add
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
