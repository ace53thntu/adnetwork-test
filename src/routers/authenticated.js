import * as React from 'react';

import {Navigate} from 'react-router-dom';

import {AdminLayout, NotFound} from 'components/layouts';
import {RoutePaths} from 'constants/route-paths';
import {appRoutes} from './app';

const authenticatedRoutes = [
  {
    path: '/',
    element: <Navigate to="/dashboard" />
  },
  {
    path: RoutePaths.LOGIN,
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: RoutePaths.REGISTER,
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
