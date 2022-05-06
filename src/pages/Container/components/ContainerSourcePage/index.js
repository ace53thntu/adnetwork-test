import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

const ContainerSourcePage = lazyWithRetry(() =>
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
