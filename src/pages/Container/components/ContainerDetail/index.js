import React from 'react';
import {ErrorBoundary} from 'components/common';
import "./index.scss";

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
