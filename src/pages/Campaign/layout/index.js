import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

export {default as CampaignPageLayout} from './page-layout';
export {default as CampaignContentLayout} from './page-content-layout';

const ListCampaignLayout = lazyWithRetry(() =>
  import('./list-layout' /* webpackChunkName: "campaign-list-layout" */)
);

function ListCampaignLayoutLazy() {
  return (
    <ErrorBoundary>
      <ListCampaignLayout />
    </ErrorBoundary>
  );
}

export {ListCampaignLayoutLazy};
