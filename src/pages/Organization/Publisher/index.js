import React from 'react';
import Loading from 'components/common/loading';

const PublisherListPage = React.lazy(() => import('./publisher-list'));

function PublisherListPagePage() {
  return (
    <React.Suspense fallback={<Loading />}>
      <PublisherListPage />
    </React.Suspense>
  );
}

export {PublisherListPagePage};
