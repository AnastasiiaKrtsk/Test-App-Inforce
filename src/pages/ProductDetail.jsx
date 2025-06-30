// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Comment from '../components/Comment';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = () => {
    axiosInstance
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error('Failed to fetch product', err);
        navigate('/');
      });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const updatedComments = [...(product.comments || []), newComment.trim()];

    axiosInstance
      .put(`/products/${id}`, { ...product, comments: updatedComments })
      .then(() => {
        setNewComment('');
        fetchProduct();
      })
      .catch((err) => console.error('Error adding comment:', err));
  };

  const handleDeleteComment = (index) => {
    const updatedComments = [...(product.comments || [])];
    updatedComments.splice(index, 1);

    axiosInstance
      .put(`/products/${id}`, { ...product, comments: updatedComments })
      .then(() => fetchProduct())
      .catch((err) => console.error('Error deleting comment:', err));
  };

  if (!product) return <div>Loading...</div>;

  const width = product.size?.width ?? 100;
  const height = product.size?.height ?? 100;

  const comments = Array.isArray(product.comments) ? product.comments : [];

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>

      <div>
        <img
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={400}
        />
        <h1>{product.name}</h1>
        <p>
          <strong>Count:</strong> {product.count}
        </p>
        <p>
          <strong>Weight:</strong> {product.weight}
        </p>
        <p>
          <strong>Size:</strong> {width} x {height}
        </p>
        <p>
          <strong>Comments:</strong> {comments.length}
        </p>
      </div>

      <div>
        <h2>Comments</h2>

        {comments.length > 0 ? (
          <ul>
            {comments.map((comment, index) => (
              <Comment
                key={index}
                comment={comment}
                onDelete={() => handleDeleteComment(index)}
              />
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}

        <div>
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
