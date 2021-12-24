import {ErrorBoundary} from 'components/common';
import React from 'react';

const AudienceListPage = React.lazy(() =>
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
