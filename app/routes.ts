import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('login', 'routes/login.tsx'),
  route('practice/:mode', 'routes/practice.tsx'),
  route('results', 'routes/results.tsx'),
  route('settings', 'routes/settings.tsx'),
  route('about', 'routes/about.tsx'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;