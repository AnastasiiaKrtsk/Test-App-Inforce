import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import DeleteModal from '../components/DeleteModal';
import axiosInstance from '../api/axiosInstance';
import { successAction } from '../redux/productSlice';
import { selectProducts } from '../redux/selectors';
import '../styles/ProductList.scss';

export const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const [showModal, setShowModal] = useState(false);
  const [_, setModalProduct] = useState(null);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axiosInstance
      .get('/products')
      .then((res) => dispatch(successAction(res.data)))
      .catch((err) => console.error('Failed to fetch', err));
  };

  const handleAddClick = () => {
    axiosInstance
      .post('/products')
      .then((res) => {
        dispatch(successAction([res.data, ...products]));
      })
      .catch((err) => console.error('Error creating product:', err));
  };

  const handleEdit = (product) => {
    setModalProduct(product);
    setShowModal(true);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    axiosInstance
      .delete(`/products/${productToDelete.id}`)
      .then(() => {
        fetchProducts();
        setDeleteModalVisible(false);
        setProductToDelete(null);
      })
      .catch((err) => console.error('Delete error:', err));
  };

  return (
    <div className="container">
      <div className="textx1">
        <h1 className="textx2">Product List</h1>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          Add Product
        </button>
      </div>

      <div className="items-number">Items Number: {products.length}</div>

      <div className="product-list">
        {products
          .slice() // clone to avoid mutating Redux state
          .sort((a, b) => {
            const nameCompare = a.name.localeCompare(b.name);
            return nameCompare !== 0 ? nameCompare : a.count - b.count;
          })
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
      </div>

      {showModal && (
        <ProductModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddClick}
        />
      )}

      {deleteModalVisible && (
        <DeleteModal
          onClose={() => setDeleteModalVisible(false)}
          onDelete={confirmDelete}
        />
      )}
    </div>
  );
};

export default ProductList;
