import {ErrorBoundary} from 'components/common';
import React from 'react';

export {default as CampaignList} from './list';
export {default as CampaignEdit} from './edit';
export {default as CampaignTabs} from './tabs';

const CampaignCreate = React.lazy(() =>
  import('./create' /* webpackChunkName: "campaign-create" */)
);
const CampaignDetail = React.lazy(() =>
  import('./detail' /* webpackChunkName: "campaign-detail" */)
);

function CampaignCreateLazy() {
  return (
    <ErrorBoundary>
      <CampaignCreate />
    </ErrorBoundary>
  );
}

function CampaignDetailLazy() {
  return (
    <ErrorBoundary>
      <CampaignDetail />
    </ErrorBoundary>
  );
}

export {CampaignCreateLazy, CampaignDetailLazy};
