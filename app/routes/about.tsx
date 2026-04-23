import { Link } from 'react-router';

export function meta() {
  return [{ title: 'About · Chaptyp' }];
}

export default function AboutRoute() {
  return (
    <section className="page about-page">
      <header className="about-header">
        <p className="eyebrow">About</p>
        <h1>Built for Swahili-first typing practice.</h1>
      </header>

      <div className="about-body">
        <p className="page-summary">
          Chaptyp is a typing trainer built around Swahili — not a language course bolted
          onto a generic typing test. Each session uses real vocabulary and authentic
          quotations so you build typing speed and language muscle at the same time.
        </p>
        <p className="page-summary">
          The word list draws from high-frequency Swahili vocabulary. The quotes are
          sourced from East African literature and thinkers including Mwalimu Julius
          Nyerere and Shaaban Robert.
        </p>
      </div>

      <Link className="primary-action" to="/">
        Start practicing
      </Link>
    </section>
  );
}