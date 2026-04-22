import React from 'react';
import { NavLink } from 'react-router-dom';

const navLinkClassName = ({ isActive }) =>
  `nav-link${isActive ? ' active' : ''}`;

const Navbar = () => {
  return (
    <header className="top-nav">
      <div className="logo">
        <NavLink to="/" className="brand-mark">
          chaptyp
        </NavLink>
      </div>

      <nav className="nav" aria-label="Primary navigation">
        <ul className="nav-links">
          <li>
            <NavLink to="/" end className={navLinkClassName}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={navLinkClassName}>
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClassName}>
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
