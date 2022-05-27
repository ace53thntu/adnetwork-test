import {ErrorBoundary} from 'components/common';
import React from 'react';

const PublisherList = React.lazy(() =>
  import('./publisher-list' /* webpackChunkName: "publisher-list" */)
);
const PublisherCreate = React.lazy(() =>
  import('./publisher-create' /* webpackChunkName: "publisher-create" */)
);
const PublisherEdit = React.lazy(() =>
  import('./publisher-edit' /* webpackChunkName: "publisher-edit" */)
);
const PublisherView = React.lazy(() =>
  import('./publisher-view' /* webpackChunkName: "publisher-view" */)
);

function PublisherListPage() {
  return (
    <ErrorBoundary>
      <PublisherList />
    </ErrorBoundary>
  );
}

function PublisherCreatePage() {
  return (
    <ErrorBoundary>
      <PublisherCreate />
    </ErrorBoundary>
  );
}

function PublisherEditPage() {
  return (
    <ErrorBoundary>
      <PublisherEdit />
    </ErrorBoundary>
  );
}

function PublisherViewPage() {
  return (
    <ErrorBoundary>
      <PublisherView />
    </ErrorBoundary>
  );
}

export {
  PublisherListPage,
  PublisherCreatePage,
  PublisherEditPage,
  PublisherViewPage
};
