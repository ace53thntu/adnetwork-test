import {ErrorBoundary} from 'components/common';
import React from 'react';

const AudienceDetailPage = React.lazy(() =>
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
