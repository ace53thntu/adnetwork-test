import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

const Containers = lazyWithRetry(() =>
  import('./Containers' /* webpackChunkName: "containers" */)
);

function ContainersLazy() {
  return (
    <ErrorBoundary>
      <Containers />
    </ErrorBoundary>
  );
}

export {ContainersLazy};
