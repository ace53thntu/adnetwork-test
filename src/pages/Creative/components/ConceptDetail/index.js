import {ErrorBoundary} from 'components/common';
import React from 'react';

const ConceptDetail = React.lazy(() =>
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
