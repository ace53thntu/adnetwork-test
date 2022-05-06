import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

const AudienceDetailPage = lazyWithRetry(() =>
  import(
    './audience-detail-page' /* webpackChunkName: "audience-detail-page" */
  )
);

function AudienceDetailPageLazy() {
  return (
    <ErrorBoundary>
      <AudienceDetailPage />
    </ErrorBoundary>
  );
}

export {AudienceDetailPageLazy};
