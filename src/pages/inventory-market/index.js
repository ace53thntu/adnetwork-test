import {ErrorBoundary} from 'components/common';
import React from 'react';

const InventoryMarket = React.lazy(() =>
  import(
    './inventory-market-list' /* webpackChunkName: "inventory-market-list" */
  )
);

function InventoryMarketLazy() {
  return (
    <ErrorBoundary>
      <InventoryMarket />
    </ErrorBoundary>
  );
}

export {InventoryMarketLazy};
