import {HASH_PATH, RoutePaths} from 'constants/route-paths';

export const ReportNav = t => {
  return [
    {
      icon: 'pe-7s-display2',
      label: t('dashboard'),
      to: `${HASH_PATH}/${RoutePaths.DASHBOARD}`
    }
  ];
};
export const AudiencesNav = t => {
  return [
    {
      icon: 'pe-7s-graph2',
      label: t('audiences'),
      to: `${HASH_PATH}/${RoutePaths.AUDIENCE}`
    }
  ];
};
export const CreativeNav = t => {
  return [
    {
      icon: 'pe-7s-graph3',
      label: t('creative'),
      to: `${HASH_PATH}/${RoutePaths.CREATIVE}`
    }
  ];
};
export const CampaignNav = t => {
  return [
    {
      icon: 'pe-7s-network',
      label: t('campaign'),
      to: `${HASH_PATH}/${RoutePaths.CAMPAIGN}`
    }
  ];
};

export const ContainerNav = (t, role) => {
  return [
    {
      icon: 'pe-7s-box1',
      label: 'Container',
      to: `${HASH_PATH}/${RoutePaths.CONTAINER}`
    }
  ];
};

export const InventoryMarketNav = (t, role) => {
  return [
    {
      icon: 'pe-7s-cart',
      label: 'Inventory Market',
      to: `${HASH_PATH}/${RoutePaths.INVENTORY_MARKET}`
    }
  ];
};

export const OrganizationNav = (t, role) => {
  return [
    {
      icon: 'pe-7s-users',
      label: t('organization'),
      content: [
        {
          label: t('publisher'),
          to: `${HASH_PATH}/${RoutePaths.ORGANIZATION}/${RoutePaths.PUBLISHER}`
        },
        {
          label: t('dsp'),
          to: `${HASH_PATH}/${RoutePaths.ORGANIZATION}/${RoutePaths.DSP}`
        },
        {
          label: t('advertiser'),
          to: `${HASH_PATH}/${RoutePaths.ORGANIZATION}/${RoutePaths.ADVERTISER}`
        }
      ]
    }
  ];
};

export const UserManagementNav = (t, role) => {
  return [
    {
      icon: 'pe-7s-user',
      label: t('userManagement'),
      to: `${HASH_PATH}/${RoutePaths.USER}`
    }
  ];
};
