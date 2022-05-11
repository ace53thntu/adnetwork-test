import {ErrorBoundary} from 'components/common';
import React from 'react';

export {default as StrategyList} from './list';
export {default as StrategyEdit} from './edit';

const StrategyCreate = React.lazy(() =>
  import('./create' /* webpackChunkName: "strategy-create" */)
);
const StrategyDetail = React.lazy(() =>
  import('./detail' /* webpackChunkName: "strategy-detail" */)
);
const StrategyEdit = React.lazy(() =>
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
