import React from 'react';
import Loading from 'components/common/loading';
import {ErrorBoundary} from 'components/common';
import AdvertiserView from './advertiser-view';

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

export {AdvertiserListPage, AdvertiserReportPage, AdvertiserViewPage};
