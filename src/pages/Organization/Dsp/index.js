import {ErrorBoundary} from 'components/common';
import React from 'react';

const DspList = React.lazy(() =>
  import('./dsp-list' /* webpackChunkName: "dsp-list" */)
);

const DspView = React.lazy(() =>
  import('./dsp-view' /* webpackChunkName: "dsp-view" */)
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

function DspViewPage() {
  return (
    <ErrorBoundary>
      <DspView />
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

export {DspListPage, DspReportPage, DspViewPage};
