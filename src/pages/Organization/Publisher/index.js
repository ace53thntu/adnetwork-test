import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

const PublisherList = lazyWithRetry(() =>
  import('./publisher-list' /* webpackChunkName: "publisher-list" */)
);
const PublisherReport = lazyWithRetry(() =>
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
