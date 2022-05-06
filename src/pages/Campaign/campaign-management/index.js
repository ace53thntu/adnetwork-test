import {ErrorBoundary} from 'components/common';
import React from 'react';
import {lazyWithRetry} from 'utils/lazyWithRetry';

export {default as CampaignList} from './list';
export {default as CampaignEditTabs} from './EditTabs';

const CampaignCreate = lazyWithRetry(() =>
  import('./create' /* webpackChunkName: "campaign-create" */)
);
const CampaignDetail = lazyWithRetry(() =>
  import('./detail' /* webpackChunkName: "campaign-detail" */)
);
const CampaignEdit = lazyWithRetry(() =>
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
