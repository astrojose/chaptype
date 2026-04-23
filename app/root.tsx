import React from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from 'react-router';

import appStylesHref from './app.css?url';

export function links() {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    { rel: 'stylesheet', href: appStylesHref },
  ];
}

export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="App">
          <header className="top-nav">
            <NavLink to="/" className="brand-mark">
              Chaptyp
            </NavLink>

            <nav className="nav" aria-label="Primary navigation">
              <ul className="nav-links">
                <li>
                  <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                    Sign in
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/settings" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                    Settings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                    About
                  </NavLink>
                </li>
              </ul>
            </nav>
          </header>
          <main className="app-shell">{children}</main>
          <footer className="site-footer">
            <div className="links">
              <ul>
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
              </ul>
            </div>
            <div className="copyright">
              <p>
                &copy; <NavLink to="/" className="primary">Chaptyp</NavLink>, {new Date().getFullYear()}
              </p>
            </div>
          </footer>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
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
      <NavLink className="primary-action" to="/">
        Return home
      </NavLink>
    </section>
  );
}