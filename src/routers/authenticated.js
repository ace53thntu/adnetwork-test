import {AdminLayout, NotFound} from 'components/layouts';
import * as React from 'react';
import {Navigate} from 'react-router-dom';

import {appRoutes} from './app';

const authenticatedRoutes = [
  {
    path: '/',
    element: <Navigate to="/dashboard" />
  },
  {
    path: 'login',
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: 'register',
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: '/',
    element: <AdminLayout />,
    children: appRoutes
  },
  // Not found routes work as you'd expect
  {path: '*', element: <NotFound />}
];

export {authenticatedRoutes};
