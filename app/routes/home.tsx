import React from 'react';
import { Link } from 'react-router';

import { getPracticeModes } from '../../src/content/practiceContent';

export function meta() {
  return [
    { title: 'Chaptyp' },
    { name: 'description', content: 'Swahili-first typing practice.' },
  ];
}

type HistoryEntry = {
  modeId: string;
  modeName: string;
  wpm: number;
  accuracy: number;
  completedAt: string;
};

export default function HomeRoute() {
  const practiceModes = getPracticeModes();
  const [history, setHistory] = React.useState<HistoryEntry[]>([]);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('session-history');
      if (stored) setHistory(JSON.parse(stored));
    } catch {
      // localStorage unavailable — ignore silently
    }
  }, []);

  return (
    <section className="page home-page">
      <header className="hero-section">
        <p className="eyebrow">Swahili-first</p>
        <h1>Typing that teaches you language.</h1>
        <p className="hero-sub">
          Build speed and vocabulary at once. Each session uses structured Swahili
          content — words, sentences, and texts chosen to build real language muscle
          alongside typing skill.
        </p>
      </header>

      <div>
        <p className="section-label">Practice modes</p>
        <nav className="mode-list" aria-label="Practice modes">
          {practiceModes.map((mode) => (
            <Link key={mode.id} to={`/practice/${mode.id}`} className="mode-item">
              <div className="mode-item-body">
                <span className="mode-name">{mode.name}</span>
                <span className="mode-desc">{mode.description}</span>
              </div>
              <div className="mode-meta">
                <span className="mode-tag">{mode.metadata.difficulty}</span>
                <span className="mode-tag">{mode.metadata.language}</span>
                <span className="mode-cta">Start →</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {history.length > 0 && (
        <div>
          <p className="section-label">Recent sessions</p>
          <ol className="history-list">
            {history.map((entry) => (
              <li key={entry.completedAt} className="history-item">
                <div className="history-item-meta">
                  <span className="history-mode">{entry.modeName}</span>
                  <time className="history-date" dateTime={entry.completedAt}>
                    {new Date(entry.completedAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <div className="history-item-stats">
                  <span className="history-stat">
                    <strong>{entry.wpm}</strong> WPM
                  </span>
                  <span className="history-stat">
                    <strong>{entry.accuracy}%</strong> accuracy
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
