import {ErrorBoundary} from 'components/common';
import Loading from 'components/common/loading';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

import AdvertiserView from './advertiser-view';

const AdvertiserList = lazyWithRetry(() => import('./advertiser-list'));
const AdvertiserReport = lazyWithRetry(() => import('./advertiser-report'));

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
