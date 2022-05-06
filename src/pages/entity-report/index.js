import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

const EntityReportLz = lazyWithRetry(() =>
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
