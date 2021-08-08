import {useRoutes} from 'react-router-dom';

import {unAuthRoutes} from './routers/unAuth';

function UnauthenticatedApp(props) {
  const routes = unAuthRoutes;

  const elements = useRoutes(routes);
  return elements;
}

UnauthenticatedApp.propTypes = {};
UnauthenticatedApp.defaultProps = {};

export {UnauthenticatedApp};
