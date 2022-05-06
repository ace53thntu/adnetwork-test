import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

const ConceptDetail = lazyWithRetry(() =>
  import('./ConceptDetail' /* webpackChunkName: "concept-detail" */)
);

function ConceptDetailLazy() {
  return (
    <ErrorBoundary>
      <ConceptDetail />
    </ErrorBoundary>
  );
}

export {ConceptDetailLazy};
