import './index.scss';

import {ErrorBoundary} from 'components/common';
import React from 'react';

const ContainerDetail = React.lazy(() =>
  import('./ContainerDetail' /* webpackChunkName: "container-detail" */)
);

const ContainerReport = React.lazy(() =>
  import('./ContainerReport' /* webpackChunkName: "container-detail" */)
);

function ContainerDetailLazy() {
  return (
    <ErrorBoundary>
      <ContainerDetail />
    </ErrorBoundary>
  );
}

function ContainerReportLazy() {
  return (
    <ErrorBoundary>
      <ContainerReport />
    </ErrorBoundary>
  );
}

export {ContainerDetailLazy, ContainerReportLazy};
