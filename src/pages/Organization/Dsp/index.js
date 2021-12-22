import React from 'react';
import Loading from 'components/common/loading';

const DspList = React.lazy(() => import('./dsp-list'));
const DspReport = React.lazy(() => import('./dsp-report'));

function DspListPage() {
  return (
    <React.Suspense fallback={<Loading />}>
      <DspList />
    </React.Suspense>
  );
}

function DspReportPage() {
  return (
    <React.Suspense fallback={<Loading />}>
      <DspReport />
    </React.Suspense>
  );
}

export {DspListPage, DspReportPage};
