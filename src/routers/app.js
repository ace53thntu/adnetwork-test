import Dashboard from 'pages/Dashboard/Dashboard';

export const appRoutes = {
  path: '/',
  children: [
    {
      path: '/dashboard',
      element: <Dashboard />
    }
  ]
};
