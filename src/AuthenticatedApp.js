import {useGetMe} from 'queries/users';
import {useEffect} from 'react';
import {useRoutes} from 'react-router-dom';
import {authenticatedRoutes} from 'routers/authenticated';
import {setUser} from 'utils/helpers/auth.helpers';

function AuthenticatedApp(props) {
  const {data: authUser, isFetching} = useGetMe({enable: true});

  useEffect(() => {
    if (!isFetching) {
      setUser(authUser);
    }
  }, [isFetching, authUser]);

  const elements = useRoutes(authenticatedRoutes);
  return elements;
}

AuthenticatedApp.propTypes = {};
AuthenticatedApp.defaultProps = {};

export {AuthenticatedApp};
