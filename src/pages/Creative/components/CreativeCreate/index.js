import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

const CreativeCreate = lazyWithRetry(() =>
  import('./CreativeCreate' /* webpackChunkName: "creative-create-dialog" */)
);

function CreativeCreateLazy() {
  return (
    <ErrorBoundary>
      <CreativeCreate />
    </ErrorBoundary>
  );
}

export {CreativeCreateLazy};
