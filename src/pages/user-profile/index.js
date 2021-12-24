import {ErrorBoundary} from 'components/common';
import React from 'react';

const UserProfile = React.lazy(() =>
  import('./UserProfile' /* webpackChunkName: "user-profile" */)
);

function UserProfilePage() {
  return (
    <ErrorBoundary>
      <UserProfile />
    </ErrorBoundary>
  );
}

export {UserProfilePage};
