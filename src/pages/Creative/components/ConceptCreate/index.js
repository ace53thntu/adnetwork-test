import {ErrorBoundary} from 'components/common';
import React from 'react';

const ConceptCreate = React.lazy(() =>
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
