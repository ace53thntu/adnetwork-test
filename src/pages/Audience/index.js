import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

const AudiencePage = lazyWithRetry(() =>
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
