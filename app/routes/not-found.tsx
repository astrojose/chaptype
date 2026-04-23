import { Link } from 'react-router';

export function meta() {
  return [{ title: 'Page not found · Chaptyp' }];
}

export default function NotFoundRoute() {
  return (
    <section className="page state-page">
      <p className="eyebrow">404</p>
      <h1>That page does not exist.</h1>
      <p className="page-summary">Use the navigation to get back into the flow.</p>
      <Link className="primary-action" to="/">
        Return home
      </Link>
    </section>
  );
}