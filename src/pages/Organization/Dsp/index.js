import {ErrorBoundary} from 'components/common';
import React from 'react';

const DspList = React.lazy(() =>
  import('./dsp-list' /* webpackChunkName: "dsp-list" */)
);

const DspCreate = React.lazy(() =>
  import('./dsp-create' /* webpackChunkName: "dsp-view" */)
);

const DspView = React.lazy(() =>
  import('./dsp-view' /* webpackChunkName: "dsp-view" */)
);
const DspEdit = React.lazy(() =>
  import('./dsp-edit' /* webpackChunkName: "dsp-report" */)
);

function DspListPage() {
  return (
    <ErrorBoundary>
      <DspList />
    </ErrorBoundary>
  );
}

function DspCreatePage() {
  return (
    <ErrorBoundary>
      <DspCreate />
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

function DspEditPage() {
  return (
    <ErrorBoundary>
      <DspEdit />
    </ErrorBoundary>
  );
}

export {DspListPage, DspCreatePage, DspEditPage, DspViewPage};
