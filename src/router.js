import React from 'react';
import {
  createBrowserRouter,
  createMemoryRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Layout from './components/layout';
import Home from './pages/Home';
import TypingGame from './pages/TypingGame';
import ResultsPage from './pages/Results';
import Settings from './pages/settings';
import About from './pages/about';
import NotFoundPage from './pages/NotFound';
import RouteErrorBoundary from './pages/RouteErrorBoundary';

const routeConfig = createRoutesFromElements(
  <Route path="/" element={<Layout />} errorElement={<RouteErrorBoundary />}>
    <Route index element={<Home />} />
    <Route path="practice/:mode" element={<TypingGame />} />
    <Route path="results" element={<ResultsPage />} />
    <Route path="settings" element={<Settings />} />
    <Route path="about" element={<About />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route>
);

export const createAppRouter = (options = {}) => {
  if (options.initialEntries) {
    return createMemoryRouter(routeConfig, {
      initialEntries: options.initialEntries,
      initialIndex: options.initialIndex ?? 0,
    });
  }

  return createBrowserRouter(routeConfig);
};
