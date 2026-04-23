import { Link, useLocation } from 'react-router';

export function meta() {
  return [{ title: 'Results · Chaptyp' }];
}

export default function ResultsRoute() {
  const { state } = useLocation();

  if (!state?.result || !state?.mode) {
    return (
      <section className="page state-page">
        <p className="eyebrow">Results</p>
        <h1>No completed session found.</h1>
        <p className="page-summary">Finish a practice session to view your typing summary.</p>
        <Link className="primary-action" to="/">
          Choose a practice mode
        </Link>
      </section>
    );
  }

  const { mode, result, session, wordResults } = state as {
    mode: { id: string; name: string };
    result: {
      wpm: number;
      accuracy: number;
      errors: number;
      elapsedSeconds: number;
    };
    session: {
      text: string;
      translations?: (string | null)[];
      meta: { category: string; sourceAttribution: string; authorOrigin: string };
    };
    wordResults?: ('correct' | 'incorrect' | null)[];
  };

  // Build missed-word pairs only when translations are available (swahili-words mode)
  const missedWords: { sw: string; en: string }[] = [];
  if (wordResults && session.translations) {
    const words = session.text.trim().split(/\s+/);
    const translations = session.translations;
    words.forEach((word, i) => {
      const translation = translations[i];
      if (wordResults[i] === 'incorrect' && translation) {
        missedWords.push({ sw: word, en: translation });
      }
    });
  }

  return (
    <section className="page results-page">
      <header className="results-header">
        <div>
          <p className="eyebrow">Session complete</p>
          <h1>{mode.name}</h1>
        </div>
        <Link className="primary-action" to={`/practice/${mode.id}`}>
          Try again
        </Link>
      </header>

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

      {missedWords.length > 0 && (
        <article className="missed-words">
          <h2>Words to review</h2>
          <ul className="missed-words-list">
            {missedWords.map(({ sw, en }) => (
              <li key={sw} className="missed-word-item">
                <span className="missed-word-sw">{sw}</span>
                <span className="missed-word-en">{en}</span>
              </li>
            ))}
          </ul>
        </article>
      )}

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
}
