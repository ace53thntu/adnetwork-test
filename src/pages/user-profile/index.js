import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

const UserProfile = lazyWithRetry(() =>
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
