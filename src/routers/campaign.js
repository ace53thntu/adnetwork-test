import {RoutePaths} from 'constants/route-paths';
import {
  CampaignCreateLazy,
  CampaignDetailLazy,
  CampaignEditLazy,
  CampaignPageLayout,
  ListCampaignLayoutLazy
} from 'pages/Campaign';
import {
  StrategyCreateLazy,
  StrategyDetailLazy,
  StrategyEditLazy
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
      element: <CampaignEditLazy />
    },
    {
      path: `/:campaignId/${RoutePaths.STRATEGY}/${RoutePaths.CREATE}`,
      element: <StrategyCreateLazy />
    },
    {
      path: `/:campaignId/${RoutePaths.STRATEGY}/:strategyId`,
      element: <StrategyDetailLazy />
    },
    {
      path: `/:campaignId/${RoutePaths.STRATEGY}/:strategyId/${RoutePaths.EDIT}`,
      element: <StrategyEditLazy />
    }
  ]
};
