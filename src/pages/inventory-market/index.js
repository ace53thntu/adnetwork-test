import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

const InventoryMarket = lazyWithRetry(() =>
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
