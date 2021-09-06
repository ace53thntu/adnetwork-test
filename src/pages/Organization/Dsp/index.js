import React from 'react';
import Loading from 'components/common/loading';

const DspList = React.lazy(() => import('./dsp-list'));

function DspListPage() {
  return (
    <React.Suspense fallback={<Loading />}>
      <DspList />
    </React.Suspense>
  );
}

export {DspListPage};
