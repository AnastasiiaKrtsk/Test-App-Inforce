// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Comment from '../components/Comment';
import ProductModal from '../components/ProductModal';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error('Error loading product', err));
  }, [id]);

  const handleEdit = (updatedData) => {
    axiosInstance
      .put(`/products/${id}`, updatedData)
      .then((res) => {
        setProduct(res.data);
        setShowModal(false);
      })
      .catch((err) => console.error('Error updating product', err));
  };

  const handleAddComment = (text) => {
    const newComment = { id: Date.now(), text };
    const updated = {
      ...product,
      comments: [...(product.comments || []), newComment],
    };
    handleEdit(updated);
  };

  const handleDeleteComment = (commentId) => {
    const updated = {
      ...product,
      comments: product.comments.filter((c) => c.id !== commentId),
    };
    handleEdit(updated);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} width={300} />
      <p>Count: {product.count}</p>
      <p>Weight: {product.weight}</p>
      <p>
        Size: {product.size.width} x {product.size.height}
      </p>

      <button
        onClick={() => setShowModal(true)}
        className="btn btn-primary mt-4"
      >
        Edit Product
      </button>

      <h3 className="mt-6 font-semibold">Comments</h3>
      <div className="mt-2">
        {product.comments?.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onDelete={() => handleDeleteComment(comment.id)}
          />
        ))}
        <input
          type="text"
          placeholder="Add comment"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              handleAddComment(e.target.value);
              e.target.value = '';
            }
          }}
          className="mt-2 border p-2 w-full"
        />
      </div>

      {showModal && (
        <ProductModal
          initialData={product}
          onClose={() => setShowModal(false)}
          onSubmit={handleEdit}
        />
      )}
    </div>
  );
}

export default ProductDetail;
