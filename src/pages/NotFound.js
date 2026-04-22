import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className="page state-page">
      <p className="eyebrow">404</p>
      <h1>We could not find that page.</h1>
      <p className="page-summary">
        Try returning home and starting one of the available practice modes.
      </p>
      <Link className="primary-action" to="/">
        Back to home
      </Link>
    </section>
  );
};

export default NotFoundPage;
