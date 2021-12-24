import {ErrorBoundary} from 'components/common';
import React from 'react';

const Containers = React.lazy(() =>
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
