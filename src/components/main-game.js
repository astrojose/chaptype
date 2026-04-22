import React from 'react';
import { useNavigate } from 'react-router-dom';

import Quote from './quote';

const formatDuration = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const buildResult = ({ words, wordResults, startedAt, finishedAt }) => {
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
};

const MainGame = ({ session, mode, onRestart }) => {
  const navigate = useNavigate();
  const inputRef = React.useRef(null);
  const words = React.useMemo(() => session.text.trim().split(/\s+/), [session.text]);
  const [typedValue, setTypedValue] = React.useState('');
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [wordResults, setWordResults] = React.useState(() => Array(words.length).fill(null));
  const [startedAt, setStartedAt] = React.useState(null);
  const [elapsedSeconds, setElapsedSeconds] = React.useState(0);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [session.id]);

  React.useEffect(() => {
    if (!startedAt) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setElapsedSeconds(Math.max(0, Math.floor((Date.now() - startedAt) / 1000)));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [startedAt]);

  const currentWord = words[currentWordIndex] ?? '';

  const handleChange = (event) => {
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

      setWordResults(nextResults);
      setTypedValue('');
      navigate('/results', {
        replace: true,
        state: {
          mode,
          session,
          result,
        },
      });
      return;
    }

    setWordResults(nextResults);
    setCurrentWordIndex((value) => value + 1);
    setTypedValue('');
  };

  return (
    <section className="page practice-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Practice mode</p>
          <h1>{mode.name}</h1>
          <p className="page-summary">{mode.description}</p>
        </div>
        <div className="practice-metadata">
          <span>{session.meta.category}</span>
          <span>{session.meta.difficulty}</span>
          <span>{session.meta.language}</span>
        </div>
      </div>

      <div className="typing-card">
        <div className="typing-card__status">
          <div>
            <p className="status-label">Timer</p>
            <strong>{formatDuration(elapsedSeconds)}</strong>
          </div>
          <div>
            <p className="status-label">Progress</p>
            <strong>
              {currentWordIndex + 1}/{words.length}
            </strong>
          </div>
        </div>

        <Quote
          words={words}
          currentWordIndex={currentWordIndex}
          currentInput={typedValue}
          wordResults={wordResults}
        />

        <div className="typing-controls">
          <label className="input-label" htmlFor="typing-input">
            Type the current practice text
          </label>
          <input
            id="typing-input"
            ref={inputRef}
            name="typed"
            autoComplete="off"
            spellCheck="false"
            value={typedValue}
            placeholder="Start typing here"
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
};

export default MainGame;
