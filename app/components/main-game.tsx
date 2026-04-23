import React from 'react';
import { useNavigate } from 'react-router';

import { Quote } from './quote';

type WordResult = 'correct' | 'incorrect' | null;

export type PracticeMode = {
  id: string;
  name: string;
  description: string;
};

export type PracticeSession = {
  id: string;
  modeId: string;
  text: string;
  entryIds: string[];
  translations?: (string | null)[];
  meta: {
    category: string;
    difficulty: string;
    language: string;
    sourceAttribution: string;
    authorOrigin: string;
    tags: string[];
    year?: number;
  };
};

type PracticeResult = {
  elapsedSeconds: number;
  wpm: number;
  accuracy: number;
  errors: number;
  correctWords: number;
  totalWords: number;
  completedAt: string;
};

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function buildResult(
  { words, wordResults, startedAt, finishedAt }: Readonly<{
    words: string[];
    wordResults: WordResult[];
    startedAt: number;
    finishedAt: number;
  }>,
): PracticeResult {
  const elapsedMilliseconds = Math.max(finishedAt - startedAt, 1000);
  const elapsedMinutes = elapsedMilliseconds / 60000;
  const correctWords = wordResults.filter((result) => result === 'correct').length;
  const errors = wordResults.filter((result) => result === 'incorrect').length;
  const totalCharacters = words.join(' ').length;

  return {
    elapsedSeconds: Math.max(1, Math.round(elapsedMilliseconds / 1000)),
    wpm: Math.max(1, Math.round((totalCharacters / 5) / elapsedMinutes)),
    accuracy: Math.round((correctWords / words.length) * 100),
    errors,
    correctWords,
    totalWords: words.length,
    completedAt: new Date(finishedAt).toISOString(),
  };
}

export function MainGame(
  { session, mode, onRestart }: Readonly<{
    session: PracticeSession;
    mode: PracticeMode;
    onRestart: () => void;
  }>,
) {
  const navigate = useNavigate();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const words = React.useMemo(() => session.text.trim().split(/\s+/), [session.text]);
  const [typedValue, setTypedValue] = React.useState('');
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [wordResults, setWordResults] = React.useState<WordResult[]>(() => new Array(words.length).fill(null));
  const [startedAt, setStartedAt] = React.useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = React.useState(0);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [session.id]);

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onRestart();
      }
    }
    globalThis.addEventListener('keydown', handleKeyDown);
    return () => globalThis.removeEventListener('keydown', handleKeyDown);
  }, [onRestart]);

  React.useEffect(() => {
    if (!startedAt) {
      return undefined;
    }

    const intervalId = globalThis.setInterval(() => {
      setElapsedSeconds(Math.max(0, Math.floor((Date.now() - startedAt) / 1000)));
    }, 1000);

    return () => globalThis.clearInterval(intervalId);
  }, [startedAt]);

  const currentWord = words[currentWordIndex] ?? '';

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextValue = event.target.value;

    if (!startedAt && nextValue.trim().length > 0) {
      setStartedAt(Date.now());
    }

    if (!nextValue.endsWith(' ')) {
      setTypedValue(nextValue);
      return;
    }

    const completedWord = nextValue.trim();

    if (!completedWord) {
      setTypedValue('');
      return;
    }

    const isCorrect = completedWord === currentWord;
    const nextResults = [...wordResults];
    nextResults[currentWordIndex] = isCorrect ? 'correct' : 'incorrect';
    const nextStartedAt = startedAt ?? Date.now();

    if (currentWordIndex === words.length - 1) {
      const finishedAt = Date.now();
      const result = buildResult({
        words,
        wordResults: nextResults,
        startedAt: nextStartedAt,
        finishedAt,
      });

      // Persist to session history (client-side only)
      try {
        const historyEntry = {
          modeId: mode.id,
          modeName: mode.name,
          wpm: result.wpm,
          accuracy: result.accuracy,
          completedAt: result.completedAt,
        };
        const existing: unknown[] = JSON.parse(localStorage.getItem('session-history') ?? '[]');
        localStorage.setItem('session-history', JSON.stringify([historyEntry, ...existing].slice(0, 10)));
      } catch {
        // localStorage unavailable — ignore silently
      }

      setWordResults(nextResults);
      setTypedValue('');
      navigate('/results', {
        replace: true,
        state: {
          mode,
          session,
          result,
          wordResults: nextResults,
        },
      });
      return;
    }

    setWordResults(nextResults);
    setCurrentWordIndex((value) => value + 1);
    setTypedValue('');
  }

  return (
    <section className="page practice-page">
      <header className="practice-header">
        <div className="practice-header-top">
          <div className="practice-header-info">
            <p className="practice-eyebrow">{mode.name}</p>
          </div>
          <div className="typing-stats">
            <div className="stat-item">
              <span className="stat-label">Time</span>
              <span className="stat-value">{formatDuration(elapsedSeconds)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Word</span>
              <span key={currentWordIndex} className="stat-value stat-value--live">
                {Math.min(currentWordIndex + 1, words.length)}/{words.length}
              </span>
            </div>
          </div>
        </div>
        <progress
          className="practice-progress"
          value={currentWordIndex}
          max={words.length}
          aria-label="Session progress"
        />
      </header>

      <div className="typing-session">
        <Quote
          words={words}
          currentWordIndex={currentWordIndex}
          currentInput={typedValue}
          wordResults={wordResults}
        />

        <div className="typing-controls">
          <label className="input-label" htmlFor="typing-input">
            Type here
          </label>
          <input
            id="typing-input"
            ref={inputRef}
            name="typed"
            autoComplete="off"
            spellCheck="false"
            value={typedValue}
            placeholder="Start typing…"
            onChange={handleChange}
            onPaste={(event) => event.preventDefault()}
          />
          <div className="typing-actions">
            <button type="button" className="secondary-action" onClick={onRestart}>
              Restart
            </button>
            <button type="button" className="secondary-action" onClick={() => navigate('/')}>
              Cancel
            </button>
          </div>
        </div>
      </div>

      <aside className="practice-reference">
        <h2>Content reference</h2>
        <dl>
          <div>
            <dt>Source</dt>
            <dd>{session.meta.sourceAttribution}</dd>
          </div>
          <div>
            <dt>Origin</dt>
            <dd>{session.meta.authorOrigin}</dd>
          </div>
          <div>
            <dt>Tags</dt>
            <dd>{session.meta.tags.join(', ')}</dd>
          </div>
        </dl>
      </aside>
    </section>
  );
}