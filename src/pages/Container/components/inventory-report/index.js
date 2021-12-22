import React from 'react';
import Loading from 'components/common/loading';

const InventoryReport = React.lazy(() => import('./inventory-report'));

function InventoryReportPage() {
  return (
    <React.Suspense fallback={<Loading />}>
      <InventoryReport />
    </React.Suspense>
  );
}

export {InventoryReportPage};
