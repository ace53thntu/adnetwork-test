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
import {USER_ROLE} from 'pages/user-management/constants';
import React from 'react';

const AMA_ROLES = [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.ADVERTISER];

export const campaignPages = {
  path: RoutePaths.CAMPAIGN,
  element: <CampaignPageLayout />,
  canAccess: AMA_ROLES,
  children: [
    {
      path: '',
      element: <ListCampaignLayoutLazy />,
      canAccess: AMA_ROLES
    },
    {
      path: '/create',
      element: <CampaignCreateLazy />,
      canAccess: AMA_ROLES
    },
    {
      path: '/:campaignId',
      element: <CampaignDetailLazy />,
      canAccess: AMA_ROLES
    },
    {
      path: `/:campaignId/${RoutePaths.EDIT}`,
      element: <CampaignEditLazy />,
      canAccess: AMA_ROLES
    },
    {
      path: `/:campaignId/${RoutePaths.STRATEGY}/${RoutePaths.CREATE}`,
      element: <StrategyCreateLazy />,
      canAccess: AMA_ROLES
    },
    {
      path: `/:campaignId/${RoutePaths.STRATEGY}/:strategyId`,
      element: <StrategyDetailLazy />,
      canAccess: AMA_ROLES
    },
    {
      path: `/:campaignId/${RoutePaths.STRATEGY}/:strategyId/${RoutePaths.EDIT}`,
      element: <StrategyEditLazy />,
      canAccess: AMA_ROLES
    }
  ]
};
