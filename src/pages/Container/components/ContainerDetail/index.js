import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

const ContainerDetail = lazyWithRetry(() =>
  import('./ContainerDetail' /* webpackChunkName: "container-detail" */)
);

const ContainerReport = lazyWithRetry(() =>
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
