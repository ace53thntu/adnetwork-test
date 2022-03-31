import {RoutePaths} from 'constants/route-paths';
import {
  ContainerDetailLazy,
  ContainerLayout,
  ContainersLazy
} from 'pages/Container';
import {ContainerReportLazy} from 'pages/Container/components/ContainerDetail';
import {ContainerSourceLazy} from 'pages/Container/components/ContainerSource';
import {ContainerSourcePageLazy} from 'pages/Container/components/ContainerSourcePage';
import {InventoryReportPage} from 'pages/Container/components/inventory-report';
import {USER_ROLE} from 'pages/user-management/constants';

export const containerPages = {
  path: RoutePaths.CONTAINER,
  element: <ContainerLayout />,
  canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.PUBLISHER],
  children: [
    {
      path: '',
      element: <ContainersLazy />,
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.PUBLISHER]
    },
    {
      path: ':cid',
      element: <ContainerDetailLazy />,
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.PUBLISHER]
    },
    {
      path: ':cid/report',
      element: <ContainerReportLazy />,
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.PUBLISHER]
    },
    {
      path: ':cid/:source',
      element: <ContainerSourceLazy />,
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.PUBLISHER]
    },
    {
      path: ':cid/:source/:pageId',
      element: <ContainerSourcePageLazy />,
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.PUBLISHER]
    }
  ]
};

export const inventoryPages = {
  path: RoutePaths.INVENTORY,
  canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.PUBLISHER],
  children: [
    {
      path: `:inventoryId/${RoutePaths.REPORT}`,
      element: <InventoryReportPage />,
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.PUBLISHER]
    }
  ]
};
