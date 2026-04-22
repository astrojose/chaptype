import React from 'react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

const RouteErrorBoundary = () => {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'An unexpected routing error occurred.';

  return (
    <section className="page state-page">
      <p className="eyebrow">Route error</p>
      <h1>{message}</h1>
      <p className="page-summary">
        Refresh the app or return home to continue practicing.
      </p>
      <Link className="primary-action" to="/">
        Return home
      </Link>
    </section>
  );
};

export default RouteErrorBoundary;
