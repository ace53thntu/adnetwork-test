import React from 'react';
import Loading from 'components/common/loading';

const PublisherList = React.lazy(() => import('./publisher-list'));
const PublisherReport = React.lazy(() => import('./publisher-report'));

function PublisherListPage() {
  return (
    <React.Suspense fallback={<Loading />}>
      <PublisherList />
    </React.Suspense>
  );
}

function PublisherReportPage() {
  return (
    <React.Suspense fallback={<Loading />}>
      <PublisherReport />
    </React.Suspense>
  );
}

export {PublisherListPage, PublisherReportPage};
