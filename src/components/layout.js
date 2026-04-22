import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './footer';
import Navbar from './navbar';

const Layout = () => {
  return (
    <div className="App">
      <Navbar />
      <main className="app-shell">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
