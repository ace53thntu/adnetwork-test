import {ErrorBoundary} from 'components/common';
import React from 'react';

const Concepts = React.lazy(() =>
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
