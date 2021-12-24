import {ErrorBoundary} from 'components/common';
import React from 'react';

export {default as CampaignPageLayout} from './page-layout';
export {default as CampaignContentLayout} from './page-content-layout';

const ListCampaignLayout = React.lazy(() =>
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
