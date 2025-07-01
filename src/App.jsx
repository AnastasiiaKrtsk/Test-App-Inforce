import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductDetail from './pages/ProductDetail';
import LocalGallery from './pages/LocalGallery';
import MockapiGallery from './pages/MockapiGallery';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MockapiGallery />} />
          <Route path="local" element={<LocalGallery />} />
          <Route path="mockapi" element={<MockapiGallery />} />
          <Route path="products/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
