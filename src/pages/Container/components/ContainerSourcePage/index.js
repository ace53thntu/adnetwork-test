import {ErrorBoundary} from 'components/common';
import React from 'react';

const ContainerSourcePage = React.lazy(() =>
  import(
    './ContainerSourcePage' /* webpackChunkName: "container-source-page" */
  )
);

function ContainerSourcePageLazy() {
  return (
    <ErrorBoundary>
      <ContainerSourcePage />
    </ErrorBoundary>
  );
}

export {ContainerSourcePageLazy};
