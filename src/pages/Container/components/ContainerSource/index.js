import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

const ContainerSource = lazyWithRetry(() =>
  import('./ContainerSource' /* webpackChunkName: "container-source" */)
);

function ContainerSourceLazy() {
  return (
    <ErrorBoundary>
      <ContainerSource />
    </ErrorBoundary>
  );
}

export {ContainerSourceLazy};
