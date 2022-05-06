import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

const AudienceListPage = lazyWithRetry(() =>
  import('./audience-list-page' /* webpackChunkName: "audience-list-page" */)
);

function AudienceListPageLazy() {
  return (
    <ErrorBoundary>
      <AudienceListPage />
    </ErrorBoundary>
  );
}

export {AudienceListPageLazy};
