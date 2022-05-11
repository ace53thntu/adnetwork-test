import {ErrorBoundary} from 'components/common';
import React from 'react';

const UserList = React.lazy(() =>
  import('./user-list' /* webpackChunkName: "user-list" */)
);

function UserListPage() {
  return (
    <ErrorBoundary>
      <UserList />
    </ErrorBoundary>
  );
}

export {UserListPage};
