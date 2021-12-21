import {useGetUploaderConfig} from 'queries/uploader';
import {useGetMe} from 'queries/users';
import React from 'react';
import {useRoutes} from 'react-router-dom';
import {authenticatedRoutes} from 'routers/authenticated';
import {setRole, setUser} from 'utils/helpers/auth.helpers';
import {setUploaderConfig} from 'utils/helpers/storeUploaderConfig.helpers';

function AuthenticatedApp(props) {
  const {data: authUser, isFetching} = useGetMe({enable: true});

  const {data: configRes, isFetching: isFetchingConfig} = useGetUploaderConfig({
    enabled: !!authUser
  });

  React.useEffect(() => {
    if (!isFetching) {
      setUser(authUser);
      setRole(authUser?.role);
    }
  }, [isFetching, authUser]);

  React.useEffect(() => {
    if (!isFetchingConfig) {
      setUploaderConfig(configRes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingConfig]);

  // return <div>AuthenticatedApp</div>;
  const elements = useRoutes(authenticatedRoutes);
  return elements;
}

AuthenticatedApp.propTypes = {};
AuthenticatedApp.defaultProps = {};

export {AuthenticatedApp};
