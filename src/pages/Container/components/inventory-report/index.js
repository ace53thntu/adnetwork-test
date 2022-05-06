import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

const InventoryReport = lazyWithRetry(() =>
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
