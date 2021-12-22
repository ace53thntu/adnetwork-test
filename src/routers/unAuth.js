import {AuthLayout} from 'components/layouts';
import {NotFound} from 'components/layouts';
import {RoutePaths} from 'constants/route-paths';
import {LoginPage} from 'pages/Login';
import * as React from 'react';
import {Navigate, useLocation} from 'react-router-dom';

function RedirectToLogin(props) {
  const location = useLocation();

  return (
    <Navigate
      to={RoutePaths.LOGIN}
      state={{
        from: location
      }}
    />
  );
}

const unAuthRoutes = [
  {
    path: '*',
    element: <RedirectToLogin />
  },
  {
    path: '/',
    element: <RedirectToLogin />
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
