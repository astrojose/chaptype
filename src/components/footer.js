import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="links">
        <ul>
          <li>
            <a
              href="https://instagram.com/chaptyp"
              target="_blank"
              rel="noreferrer"
              className="primary"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://github.com/astrojose/chaptype"
              target="_blank"
              rel="noreferrer"
              className="primary"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
      <div className="copyright">
        <p>
          &copy; <Link to="/" className="primary">Chaptyp</Link>, {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
