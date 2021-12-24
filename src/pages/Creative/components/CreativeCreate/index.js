import {ErrorBoundary} from 'components/common';
import React from 'react';

const CreativeCreate = React.lazy(() =>
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
