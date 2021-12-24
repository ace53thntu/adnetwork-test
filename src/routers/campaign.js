import {RoutePaths} from 'constants/route-paths';
import {
  CampaignCreateLazy,
  CampaignDetailLazy,
  CampaignEdit,
  CampaignPageLayout,
  ListCampaignLayoutLazy
} from 'pages/Campaign';
import {
  StrategyCreate,
  StrategyDetail,
  StrategyEdit
} from 'pages/Campaign/strategy';
import React from 'react';

export const campaignPages = {
  path: RoutePaths.CAMPAIGN,
  element: <CampaignPageLayout />,
  children: [
    {
      path: '',
      element: <ListCampaignLayoutLazy />
    },
    {
      path: '/create',
      element: <CampaignCreateLazy />
    },
    {
      path: '/:campaignId',
      element: <CampaignDetailLazy />
    },
    {
      path: `/:campaignId/${RoutePaths.EDIT}`,
      element: <CampaignEdit />
      // canAccess: [MANAGER, TRADER]
    },
    {
      path: `/:campaignId/${RoutePaths.STRATEGY}/${RoutePaths.CREATE}`,
      element: <StrategyCreate />
    },
    {
      path: `/:campaignId/${RoutePaths.STRATEGY}/:strategyId`,
      element: <StrategyDetail />
    },
    {
      path: `/:campaignId/${RoutePaths.STRATEGY}/:strategyId/${RoutePaths.EDIT}`,
      element: <StrategyEdit />
    }
  ]
};
