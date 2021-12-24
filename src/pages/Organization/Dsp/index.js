import {ErrorBoundary} from 'components/common';
import React from 'react';

const DspList = React.lazy(() =>
  import('./dsp-list' /* webpackChunkName: "dsp-list" */)
);
const DspReport = React.lazy(() =>
  import('./dsp-report' /* webpackChunkName: "dsp-report" */)
);

function DspListPage() {
  return (
    <ErrorBoundary>
      <DspList />
    </ErrorBoundary>
  );
}

function DspReportPage() {
  return (
    <ErrorBoundary>
      <DspReport />
    </ErrorBoundary>
  );
}

export {DspListPage, DspReportPage};
