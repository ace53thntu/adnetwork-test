import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

const UserList = lazyWithRetry(() =>
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
