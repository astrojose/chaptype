import React from 'react';
import { RouterProvider } from 'react-router-dom';

import './styles/App.css';
import { createAppRouter } from './router';

function App() {
  const router = React.useMemo(() => createAppRouter(), []);

  return <RouterProvider router={router} />;
}

export default App;
