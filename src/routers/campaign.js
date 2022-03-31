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

export const campaignPages = {
  path: RoutePaths.CAMPAIGN,
  element: <CampaignPageLayout />,
  canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.ADVERTISER],
  children: [
    {
      path: '',
      element: <ListCampaignLayoutLazy />,
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.ADVERTISER]
    },
    {
      path: '/create',
      element: <CampaignCreateLazy />,
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.ADVERTISER]
    },
    {
      path: '/:campaignId',
      element: <CampaignDetailLazy />,
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.ADVERTISER]
    },
    {
      path: `/:campaignId/${RoutePaths.EDIT}`,
      element: <CampaignEditLazy />,
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.ADVERTISER]
    },
    {
      path: `/:campaignId/${RoutePaths.STRATEGY}/${RoutePaths.CREATE}`,
      element: <StrategyCreateLazy />,
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.ADVERTISER]
    },
    {
      path: `/:campaignId/${RoutePaths.STRATEGY}/:strategyId`,
      element: <StrategyDetailLazy />,
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.ADVERTISER]
    },
    {
      path: `/:campaignId/${RoutePaths.STRATEGY}/:strategyId/${RoutePaths.EDIT}`,
      element: <StrategyEditLazy />,
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.ADVERTISER]
    }
  ]
};
