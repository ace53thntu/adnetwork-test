import {ErrorBoundary} from 'components/common';
import React from 'react';

const ContainerSource = React.lazy(() =>
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
