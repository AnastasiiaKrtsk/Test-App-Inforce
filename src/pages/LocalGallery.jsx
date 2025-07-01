import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { successAction } from '../redux/productSlice';
import { selectProducts } from '../redux/selectors';
import ProductAddModal from '../components/ProductAddModal';
import '../styles/ProductList.scss';

function LocalGallery() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      fetch('/products.json')
        .then((res) => res.json())
        .then((data) => {
          const withIds = data.map((product) => ({
            ...product,
            id: product.id || nanoid(),
          }));
          dispatch(successAction(withIds));
        })
        .catch((err) => console.error('Error loading local data:', err));
    }
  }, [dispatch, products.length]);

  const handleAddProduct = (newProduct) => {
    const productWithId = { ...newProduct, id: nanoid() };
    dispatch(successAction([productWithId, ...products]));
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    dispatch(successAction(updatedProducts));
  };

  return (
    <div className="container">
      <div className="textx1">
        <h2>Local Products</h2>

        <div className="items-number">Items Number: {products.length}</div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add Product
        </button>
      </div>

      <div className="product-list">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.imageUrl} alt={p.name} width={150} height={150} />
            <h3>{p.name}</h3>
            <p>Count: {p.count}</p>
            <p>
              Size: {p.size?.width} x {p.size?.height}
            </p>
            <p>Weight: {p.weight}</p>
            <p>Comments: {Array.isArray(p.comments) ? p.comments.length : 0}</p>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteProduct(p.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <ProductAddModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddProduct}
        />
      )}
    </div>
  );
}

export default LocalGallery;
