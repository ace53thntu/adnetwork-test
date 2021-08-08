import {useRoutes} from 'react-router-dom';
import {authenticatedRoutes} from 'routers/authenticated';

function AuthenticatedApp(props) {
  const elements = useRoutes(authenticatedRoutes);
  return elements;
}

AuthenticatedApp.propTypes = {};
AuthenticatedApp.defaultProps = {};

export {AuthenticatedApp};
