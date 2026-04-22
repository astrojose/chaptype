import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';

import { createAppRouter } from './router';

const originalWarn = console.warn;

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation((message, ...args) => {
    if (typeof message === 'string' && message.includes('React Router Future Flag Warning')) {
      return;
    }

    originalWarn(message, ...args);
  });
});

afterEach(() => {
  console.warn.mockRestore();
});

const renderRoute = (initialEntries = ['/']) => {
  const router = createAppRouter({ initialEntries });

  return render(<RouterProvider router={router} />);
};

test('renders the available phase 1 practice modes on the home page', () => {
  renderRoute();

  expect(
    screen.getByRole('heading', {
      name: /swahili-first typing practice built around structured learning modes/i,
    })
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /start swahili words/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /start swahili quotes/i })).toBeInTheDocument();
});

test('renders a practice session for a valid mode route', () => {
  renderRoute(['/practice/swahili-words']);

  expect(screen.getByRole('heading', { name: /swahili words/i })).toBeInTheDocument();
  expect(
    screen.getByRole('textbox', { name: /type the current practice text/i })
  ).toBeInTheDocument();
});

test('renders the dedicated not found page for invalid routes', () => {
  renderRoute(['/missing']);

  expect(screen.getByRole('heading', { name: /we could not find that page/i })).toBeInTheDocument();
});
