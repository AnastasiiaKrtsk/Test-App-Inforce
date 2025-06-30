// src/components/ProductCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductCard.scss';

function ProductCard({ product, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <div onClick={() => navigate(`/products/${product.id}`)}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="card-img"
          width={200}
          height={300}
        />
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p>Count: {product.count}</p>
        <p>Weight: {product.weight}</p>
        <p>
          Size: {product.size.width} x {product.size.height}
        </p>
        <p>Comments: {product.comments?.length}</p>
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={() => onEdit(product)}
          className="btn btn-sm btn-primary"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product)}
          className="btn btn-sm btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
