import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import axiosInstance from '../api/axiosInstance';
import { successAction, searchAction, moreAction } from '../redux/productSlice'; // double check this path
import '../styles/ProductList.scss';

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const [showModal, setShowModal] = React.useState(false);
  const [modalProduct, setModalProduct] = React.useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axiosInstance
      .get('/products')
      .then((res) => dispatch(successAction(res.data)))
      .catch((err) => console.error('Failed to fetch', err));
  };

  const sortedProducts = [...products].sort((a, b) => {
    const nameCompare = a.name.localeCompare(b.name);
    return nameCompare !== 0 ? nameCompare : a.count - b.count;
  });

  const handleAddClick = () => {
    setModalProduct(null);
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setModalProduct(product);
    setShowModal(true);
  };

  const handleDelete = (product) => {
    if (window.confirm(`Delete "${product.name}"?`)) {
      axiosInstance
        .delete(`/products/${product.id}`)
        .then(() => fetchProducts())
        .catch((err) => console.error('Delete error:', err));
    }
  };

  const handleModalSubmit = (formData) => {
    const data = {
      ...formData,
      count: Number(formData.count),
      size: {
        width: Number(formData.size.width),
        height: Number(formData.size.height),
      },
    };

    const request = modalProduct
      ? axiosInstance.put(`/products/${modalProduct.id}`, data)
      : axiosInstance.post('/products', { ...data, comments: [] });

    request
      .then(() => {
        setShowModal(false);
        fetchProducts();
      })
      .catch((err) => console.error('Save error', err));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product List</h1>
        <button onClick={handleAddClick} className="btn btn-primary">
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
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
          initialData={modalProduct}
          onClose={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
}

export default ProductList;
