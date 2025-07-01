import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductCard.scss';
import { nanoid } from 'nanoid';

export const ProductCard = ({ product, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const width = product.size?.width ?? 100;
  const height = product.size?.height ?? 100;

  const commentsCount = Array.isArray(product.comments)
    ? product.comments.length
    : 0;

  return (
    <div className="product-card">
      <div
        onClick={() => navigate(`/products/${product.id}`)}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="card-img"
          width={200}
          height={300}
          loading="lazy"
        />
        <h3 className="text">{product.name}</h3>
        <p>Count: {product.count}</p>
        <p>Weight: {product.weight}</p>
        <p>
          Size: {width} x {height}
        </p>
        <p>Comments: {commentsCount}</p>
      </div>

      <div className="flex">
        <button onClick={() => onEdit(product)} className="btn">
          Edit
        </button>
        <button onClick={() => onDelete(product)} className="btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
