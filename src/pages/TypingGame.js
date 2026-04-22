import React from 'react';
import { useParams } from 'react-router-dom';

import MainGame from '../components/main-game';
import { getPracticeMode, getPracticeSession } from '../content/practiceContent';
import NotFoundPage from './NotFound';

const TypingGame = () => {
  const { mode: modeId } = useParams();
  const [sessionVersion, setSessionVersion] = React.useState(0);
  const mode = getPracticeMode(modeId);
  const session = React.useMemo(
    () => (mode ? getPracticeSession(mode.id) : null),
    [mode, sessionVersion]
  );

  if (!mode || !session) {
    return <NotFoundPage />;
  }

  return (
    <MainGame
      key={session.id}
      mode={mode}
      session={session}
      onRestart={() => setSessionVersion((value) => value + 1)}
    />
  );
};

export default TypingGame;
