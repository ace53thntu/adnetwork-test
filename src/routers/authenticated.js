import {AdminLayout, NotFound} from 'components/layouts';
import {RoutePaths} from 'constants/route-paths';
import * as React from 'react';
import {Navigate, useLocation} from 'react-router-dom';

import {appRoutes} from './app';

function RedirectToPreviousRoute(props) {
  const {to} = props;
  const location = useLocation();

  if (location.state?.from?.pathname) {
    return (
      <Navigate
        to={`${location.state.from.pathname}${location.state.from.search}`}
      />
    );
  }

  return <Navigate to={to} />;
}

const authenticatedRoutes = [
  {
    path: '/',
    element: <RedirectToPreviousRoute to="/dashboard" />
  },
  {
    path: RoutePaths.LOGIN,
    element: <RedirectToPreviousRoute to="/dashboard" replace />
  },
  {
    path: RoutePaths.REGISTER,
    element: <RedirectToPreviousRoute to="/dashboard" replace />
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
