import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

export {default as StrategyList} from './list';
export {default as StrategyEdit} from './edit';

const StrategyCreate = lazyWithRetry(() =>
  import('./create' /* webpackChunkName: "strategy-create" */)
);
const StrategyDetail = lazyWithRetry(() =>
  import('./detail' /* webpackChunkName: "strategy-detail" */)
);
const StrategyEdit = lazyWithRetry(() =>
  import('./edit' /* webpackChunkName: "strategy-edit" */)
);

function StrategyCreateLazy() {
  return (
    <ErrorBoundary>
      <StrategyCreate />
    </ErrorBoundary>
  );
}

function StrategyDetailLazy() {
  return (
    <ErrorBoundary>
      <StrategyDetail />
    </ErrorBoundary>
  );
}

function StrategyEditLazy() {
  return (
    <ErrorBoundary>
      <StrategyEdit />
    </ErrorBoundary>
  );
}

export {StrategyCreateLazy, StrategyDetailLazy, StrategyEditLazy};
