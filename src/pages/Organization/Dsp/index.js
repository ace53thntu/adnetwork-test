import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

const DspList = lazyWithRetry(() =>
  import('./dsp-list' /* webpackChunkName: "dsp-list" */)
);

const DspView = lazyWithRetry(() =>
  import('./dsp-view' /* webpackChunkName: "dsp-view" */)
);
const DspReport = lazyWithRetry(() =>
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
