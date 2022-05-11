import {ErrorBoundary} from 'components/common';
import React from 'react';

const InventoryReport = React.lazy(() =>
  import('./inventory-report' /* webpackChunkName: "inventory-report" */)
);

function InventoryReportPage() {
  return (
    <ErrorBoundary>
      <InventoryReport />
    </ErrorBoundary>
  );
}

export {InventoryReportPage};
