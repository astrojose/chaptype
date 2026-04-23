import React from 'react';

type WordResult = 'correct' | 'incorrect' | null;

export function Quote(
  { words, currentWordIndex, currentInput, wordResults }: Readonly<{
    words: string[];
    currentWordIndex: number;
    currentInput: string;
    wordResults: WordResult[];
  }>,
) {
  const activeInput = currentInput.trim();

  return (
    <div className="quote" aria-live="polite">
      <p className="quoteText">
        {words.map((word, index) => {
          const classes = ['quote-word'];
          const status = wordResults[index];

          if (status) {
            classes.push(`is-${status}`);
          }

          if (index === currentWordIndex) {
            classes.push('is-current');

            if (activeInput) {
              classes.push(word.startsWith(activeInput) ? 'matches-current' : 'has-error');
            }
          }

          return (
            <span key={`${word}-${index}`} className={classes.join(' ')}>
              {word}
            </span>
          );
        })}
      </p>
    </div>
  );
}