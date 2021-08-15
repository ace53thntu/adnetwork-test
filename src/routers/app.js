import Dashboard from 'pages/Dashboard/Dashboard';
import Campaign from 'pages/Campaign';

export const appRoutes = {
  path: '/',
  children: [
    {
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/campaigns/*',
      element: <Campaign />
    }
  ]
};
