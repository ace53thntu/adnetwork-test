import {ErrorBoundary} from 'components/common';
import React from 'react';

const EntityReportLz = React.lazy(() =>
  import('./entity-report' /* webpackChunkName: "entity-report" */)
);

function EntityReport() {
  return (
    <ErrorBoundary>
      <EntityReportLz />
    </ErrorBoundary>
  );
}

export {EntityReport};
