import {ErrorBoundary} from 'components/common';
import React from 'react';

export {default as CampaignList} from './list';
export {default as CampaignEditTabs} from './EditTabs';

const CampaignCreate = React.lazy(() =>
  import('./create' /* webpackChunkName: "campaign-create" */)
);
const CampaignDetail = React.lazy(() =>
  import('./detail' /* webpackChunkName: "campaign-detail" */)
);
const CampaignEdit = React.lazy(() =>
  import('./edit' /* webpackChunkName: "campaign-edit" */)
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

function CampaignEditLazy() {
  return (
    <ErrorBoundary>
      <CampaignEdit />
    </ErrorBoundary>
  );
}

export {CampaignCreateLazy, CampaignDetailLazy, CampaignEditLazy};
