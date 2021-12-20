import React from 'react';
import Loading from 'components/common/loading';

const UserList = React.lazy(() => import('./user-list'));

function UserListPage() {
  return (
    <React.Suspense fallback={<Loading />}>
      <UserList />
    </React.Suspense>
  );
}

export {UserListPage};
