import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

const Concepts = lazyWithRetry(() =>
  import('./Concepts' /* webpackChunkName: "concepts" */)
);

function ConceptsLazy() {
  return (
    <ErrorBoundary>
      <Concepts />
    </ErrorBoundary>
  );
}

export {ConceptsLazy};
