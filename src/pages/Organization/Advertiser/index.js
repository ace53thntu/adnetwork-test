import {ErrorBoundary} from 'components/common';
import Loading from 'components/common/loading';
import React from 'react';

import AdvertiserView from './advertiser-view';
import AdvertiserEdit from './advertiser-edit';

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
  AdvertiserEditPage
};
