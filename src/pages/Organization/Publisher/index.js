import {ErrorBoundary} from 'components/common';
import React from 'react';

const PublisherList = React.lazy(() =>
  import('./publisher-list' /* webpackChunkName: "publisher-list" */)
);
const PublisherReport = React.lazy(() =>
  import('./publisher-report' /* webpackChunkName: "publisher-report" */)
);

function PublisherListPage() {
  return (
    <ErrorBoundary>
      <PublisherList />
    </ErrorBoundary>
  );
}

function PublisherReportPage() {
  return (
    <ErrorBoundary>
      <PublisherReport />
    </ErrorBoundary>
  );
}

export {PublisherListPage, PublisherReportPage};
