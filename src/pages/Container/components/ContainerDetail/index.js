import {ErrorBoundary} from 'components/common';
import React from 'react';

const ContainerDetail = React.lazy(() =>
  import('./ContainerDetail' /* webpackChunkName: "container-detail" */)
);

function ContainerDetailLazy() {
  return (
    <ErrorBoundary>
      <ContainerDetail />
    </ErrorBoundary>
  );
}

export {ContainerDetailLazy};
