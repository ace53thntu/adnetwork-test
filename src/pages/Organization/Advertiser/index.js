import React from 'react';
import Loading from 'components/common/loading';

const AdvertiserList = React.lazy(() => import('./advertiser-list'));

function AdvertiserListPage() {
  return (
    <React.Suspense fallback={<Loading />}>
      <AdvertiserList />
    </React.Suspense>
  );
}

export {AdvertiserListPage};
