import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ResultsPage = () => {
  const { state } = useLocation();

  if (!state?.result || !state?.mode) {
    return (
      <section className="page state-page">
        <p className="eyebrow">Results</p>
        <h1>No completed session found.</h1>
        <p className="page-summary">
          Finish a practice session to view your typing summary.
        </p>
        <Link className="primary-action" to="/">
          Choose a practice mode
        </Link>
      </section>
    );
  }

  const { mode, result, session } = state;

  return (
    <section className="page results-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Session complete</p>
          <h1>{mode.name} results</h1>
          <p className="page-summary">
            Structured session metadata now flows through practice and results routes.
          </p>
        </div>
        <Link className="primary-action" to={`/practice/${mode.id}`}>
          Try again
        </Link>
      </div>

      <div className="results-grid">
        <article className="result-card">
          <span>Speed</span>
          <strong>{result.wpm} WPM</strong>
        </article>
        <article className="result-card">
          <span>Accuracy</span>
          <strong>{result.accuracy}%</strong>
        </article>
        <article className="result-card">
          <span>Errors</span>
          <strong>{result.errors}</strong>
        </article>
        <article className="result-card">
          <span>Duration</span>
          <strong>{result.elapsedSeconds}s</strong>
        </article>
      </div>

      <article className="result-details">
        <h2>Practice source</h2>
        <dl>
          <div>
            <dt>Category</dt>
            <dd>{session.meta.category}</dd>
          </div>
          <div>
            <dt>Source</dt>
            <dd>{session.meta.sourceAttribution}</dd>
          </div>
          <div>
            <dt>Origin</dt>
            <dd>{session.meta.authorOrigin}</dd>
          </div>
        </dl>
      </article>
    </section>
  );
};

export default ResultsPage;
