import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

const ConceptCreate = lazyWithRetry(() =>
  import('./ConceptCreate' /* webpackChunkName: "concept-create" */)
);

function ConceptCreateLazy() {
  return (
    <ErrorBoundary>
      <ConceptCreate />
    </ErrorBoundary>
  );
}

export {ConceptCreateLazy};
