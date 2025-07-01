import React, { useState } from 'react';
import '../styles/ProductAddModal.scss';

const ProductAddModal = ({ onClose, onSubmit, initialData = null }) => {
  const [product, setProduct] = useState(
    initialData || {
      name: '',
      imageUrl: '',
      count: '',
      size: { width: '', height: '' },
      weight: '',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'width' || name === 'height') {
      setProduct((prev) => ({
        ...prev,
        size: {
          ...prev.size,
          [name]: value,
        },
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const preparedProduct = {
      ...product,
      count: parseInt(product.count, 10),
      size: {
        width: parseInt(product.size.width, 10),
        height: parseInt(product.size.height, 10),
      },
    };

    onSubmit(preparedProduct);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h2>

        <form onSubmit={handleSubmit} className="modal-add-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Image URL:
            <input
              type="text"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Count:
            <input
              type="number"
              name="count"
              value={product.count}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Width:
            <input
              type="number"
              name="width"
              value={product.size.width}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Height:
            <input
              type="number"
              name="height"
              value={product.size.height}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Weight:
            <input
              type="text"
              name="weight"
              value={product.weight}
              onChange={handleChange}
              required
            />
          </label>

          <div className="modal-buttons">
            <button type="submit" className="btn btn-primary">
              {initialData ? 'Save Changes' : 'Add Product'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAddModal;
