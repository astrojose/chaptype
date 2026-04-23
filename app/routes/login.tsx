import { Link } from 'react-router';

export function meta() {
  return [
    { title: 'Sign in · Chaptyp' },
    { name: 'description', content: 'Sign in to your Chaptyp portal.' },
  ];
}

export default function LoginRoute() {
  return (
    <section className="page state-page">
      <p className="eyebrow">Authentication</p>
      <h1>Sign in to continue</h1>
      <p className="page-summary">
        The framework shell is ready; route actions and session protection come next.
      </p>
      <form className="typing-controls" method="post">
        <label className="input-label" htmlFor="username">
          Username
        </label>
        <input id="username" name="username" autoComplete="username" />

        <label className="input-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
        />

        <button className="primary-action" type="submit">
          Sign in
        </button>
      </form>
      <Link className="secondary-action" to="/">
        Back to practice
      </Link>
    </section>
  );
}