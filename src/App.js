import {UnauthenticatedApp} from 'UnauthenticatedApp';
import {BlockOverlay} from 'components/common';
import {useAuth} from 'context/auth/hooks';
import * as React from 'react';

import {AuthenticatedApp} from './AuthenticatedApp';

function App(props) {
  const {
    state: {isAuthenticated}
  } = useAuth();

  return (
    <React.Suspense fallback={<BlockOverlay />}>
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

App.propTypes = {};
App.defaultProps = {};

export default App;
