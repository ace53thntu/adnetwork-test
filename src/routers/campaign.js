import {RoutePaths} from 'constants/route-paths';
import {
  CampaignCreate,
  ListContainerLayout,
  CampaignPageLayout,
  CampaignDetail,
  CampaignEdit
} from 'pages/Campaign';
import {
  StrategyCreate,
  StrategyDetail,
  StrategyEdit
} from 'pages/Campaign/strategy';

// import {ROLES} from 'core/constants';

// const {MANAGER, TRADER} = ROLES;

export const campaignPages = {
  path: RoutePaths.CAMPAIGN,
  element: <CampaignPageLayout />,
  children: [
    {
      path: '',
      element: <ListContainerLayout />
      // canAccess: [MANAGER, TRADER]
    },
    {
      path: '/create',
      element: <CampaignCreate />
      // canAccess: [MANAGER, TRADER]
    },
    {
      path: '/:campaignId',
      element: <CampaignDetail />
      // canAccess: [MANAGER, TRADER]
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
