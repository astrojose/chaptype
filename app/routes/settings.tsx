import { Link } from 'react-router';

export function meta() {
  return [{ title: 'Settings · Chaptyp' }];
}

export default function SettingsRoute() {
  return (
    <section className="page state-page">
      <p className="eyebrow">Settings</p>
      <h1>Fine-tune practice later</h1>
      <p className="page-summary">
        This route is preserved for the framework migration and will host preferences,
        auth-aware settings, and future backend-backed toggles.
      </p>
      <Link className="primary-action" to="/">
        Return home
      </Link>
    </section>
  );
}