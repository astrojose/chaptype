import React from 'react';
import { useLoaderData } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';

import { MainGame } from '../components/main-game';
import type { PracticeMode, PracticeSession } from '../components/main-game';
import { getPracticeMode, getPracticeSession } from '../../src/content/practiceContent';

export function meta() {
  return [{ title: 'Practice · Chaptyp' }];
}

export function loader({ params }: LoaderFunctionArgs) {
  const modeId = params.mode;
  if (!modeId) throw new Response('Not Found', { status: 404 });

  const mode = getPracticeMode(modeId) as PracticeMode | null;
  if (!mode) throw new Response('Practice mode not found', { status: 404 });

  const session = getPracticeSession(mode.id) as PracticeSession | null;
  if (!session) throw new Response('No session available for this mode', { status: 404 });

  return { mode, session };
}

export default function PracticeRoute() {
  const { mode, session: loaderSession } = useLoaderData<typeof loader>();

  // Restart increments this; a new client-side session is generated on each restart.
  const [restartVersion, setRestartVersion] = React.useState(0);
  const [restartSession, setRestartSession] = React.useState<PracticeSession | null>(null);
  const session = restartSession ?? loaderSession;

  function handleRestart() {
    const nextSession = getPracticeSession(mode.id) as PracticeSession | null;
    if (nextSession) {
      const nextVersion = restartVersion + 1;
      setRestartVersion(nextVersion);
      setRestartSession({ ...nextSession, id: `${nextSession.id}-r${nextVersion}` });
    }
  }

  return (
    <MainGame
      key={session.id}
      mode={mode}
      session={session}
      onRestart={handleRestart}
    />
  );
}