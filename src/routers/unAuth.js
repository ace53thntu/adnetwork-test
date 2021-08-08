import {AuthLayout} from 'components/layouts';
import {NotFound} from 'components/layouts';
import {LoginPage} from 'pages/Login';
import * as React from 'react';
import {Navigate} from 'react-router-dom';

const unAuthRoutes = [
  {
    path: '*',
    element: <Navigate to="login" />
  },
  {
    path: '/',
    element: <Navigate to="login" />
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />
      }
    ]
  },
  // Not found routes work as you'd expect
  {path: '*', element: <NotFound />}
];

export {unAuthRoutes};
