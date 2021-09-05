import React from 'react';
import Loading from 'components/common/loading';

const AdvertiserList = React.lazy(() => import('./advertiser-list'));
const AdvertiserCreate = React.lazy(() => import('./advertiser-create'));
const AdvertiserEdit = React.lazy(() => import('./advertiser-list'));

function AdvertiserListPage() {
  return (
    <React.Suspense fallback={<Loading />}>
      <AdvertiserList />
    </React.Suspense>
  );
}

function AdvertiserCreatePage() {
  return (
    <React.Suspense fallback={<Loading />}>
      <AdvertiserCreate />
    </React.Suspense>
  );
}

function AdvertiserEditPage() {
  return (
    <React.Suspense fallback={<Loading />}>
      <AdvertiserEdit />
    </React.Suspense>
  );
}

export {AdvertiserListPage, AdvertiserCreatePage, AdvertiserEditPage};
