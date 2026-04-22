import React from 'react';
import { Link } from 'react-router-dom';

import { getPracticeModes } from '../content/practiceContent';

const Home = () => {
  const practiceModes = getPracticeModes();

  return (
    <section className="page home-page">
      <div className="hero-card">
        <p className="eyebrow">Phase 1 foundation</p>
        <h1>Swahili-first typing practice built around structured learning modes.</h1>
        <p className="page-summary">
          Start with focused vocabulary drills or longer quote practice. Each mode now
          loads structured content with reusable metadata for future filters, analytics,
          and adaptive learning.
        </p>
      </div>

      <div className="mode-grid">
        {practiceModes.map((mode) => (
          <article key={mode.id} className="mode-card">
            <div>
              <p className="eyebrow">{mode.metadata.category}</p>
              <h2>{mode.name}</h2>
              <p>{mode.description}</p>
            </div>
            <ul className="mode-meta-list">
              <li>{mode.metadata.difficulty}</li>
              <li>{mode.metadata.language}</li>
              <li>{mode.metadata.tags.slice(0, 2).join(' · ')}</li>
            </ul>
            <Link className="primary-action" to={`/practice/${mode.id}`}>
              Start {mode.name}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Home;
