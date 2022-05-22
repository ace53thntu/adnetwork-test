import {ErrorBoundary} from 'components/common';
import Loading from 'components/common/loading';
import React from 'react';

const AdvertiserCreate = React.lazy(() =>
  import('./advertiser-create' /* webpackChunkName: "advertiser-create" */)
);
const AdvertiserView = React.lazy(() =>
  import('./advertiser-view' /* webpackChunkName: "advertiser-view" */)
);
const AdvertiserEdit = React.lazy(() =>
  import('./advertiser-edit' /* webpackChunkName: "advertiser-edit" */)
);
const AdvertiserList = React.lazy(() => import('./advertiser-list'));
const AdvertiserReport = React.lazy(() => import('./advertiser-report'));

function AdvertiserListPage() {
  return (
    <React.Suspense fallback={<Loading />}>
      <AdvertiserList />
    </React.Suspense>
  );
}

function AdvertiserReportPage() {
  return (
    <React.Suspense fallback={<Loading />}>
      <AdvertiserReport />
    </React.Suspense>
  );
}

function AdvertiserCreatePage() {
  return (
    <ErrorBoundary>
      <AdvertiserCreate />
    </ErrorBoundary>
  );
}

function AdvertiserViewPage() {
  return (
    <ErrorBoundary>
      <AdvertiserView />
    </ErrorBoundary>
  );
}

function AdvertiserEditPage() {
  return (
    <ErrorBoundary>
      <AdvertiserEdit />
    </ErrorBoundary>
  );
}

export {
  AdvertiserListPage,
  AdvertiserReportPage,
  AdvertiserViewPage,
  AdvertiserEditPage,
  AdvertiserCreatePage
};
