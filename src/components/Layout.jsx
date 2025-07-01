import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div>
      <header>
        <h1>INFORCE STORE</h1>
        <nav className="layout-nav">
          <NavLink to="/" end className="active">
            Home
          </NavLink>
          <NavLink to="/local" className="active">
            LocalGallery
          </NavLink>
          <NavLink to="/mockapi" className="active">
            MockapiGallery
          </NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>&copy; 2025</p>
      </footer>
    </div>
  );
};

export default Layout;
