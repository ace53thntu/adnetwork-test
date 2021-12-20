import {AuthLayout} from 'components/layouts';
import {NotFound} from 'components/layouts';
import {RoutePaths} from 'constants/route-paths';
import {LoginPage} from 'pages/Login';
import * as React from 'react';
import {Navigate} from 'react-router-dom';

const unAuthRoutes = [
  {
    path: '*',
    element: <Navigate to={RoutePaths.LOGIN} />
  },
  {
    path: '/',
    element: <Navigate to={RoutePaths.LOGIN} />
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: RoutePaths.LOGIN,
        element: <LoginPage />
      }
    ]
  },
  // Not found routes work as you'd expect
  {path: '*', element: <NotFound />}
];

export {unAuthRoutes};
