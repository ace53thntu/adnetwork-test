import {ErrorBoundary} from 'components/common';
import React from 'react';

const AudiencePage = React.lazy(() =>
  import('./Audience' /* webpackChunkName: "audience" */)
);

function AudiencePageLazy(props) {
  return (
    <ErrorBoundary>
      <AudiencePage />
    </ErrorBoundary>
  );
}

export {AudiencePageLazy};
