import {ErrorBoundary} from 'components/common';
import React from 'react';

const EntityReportLz = React.lazy(() =>
  import('./EntityReport' /* webpackChunkName: "entity-report" */)
);

function EntityReport(props) {
  return (
    <ErrorBoundary>
      <EntityReportLz {...props} />
    </ErrorBoundary>
  );
}

export {EntityReport};
