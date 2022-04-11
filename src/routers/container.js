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

const AMP_ROLES = [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.PUBLISHER];

export const containerPages = {
  path: RoutePaths.CONTAINER,
  element: <ContainerLayout />,
  canAccess: AMP_ROLES,
  children: [
    {
      path: '',
      element: <ContainersLazy />,
      canAccess: AMP_ROLES
    },
    {
      path: ':cid',
      element: <ContainerDetailLazy />,
      canAccess: AMP_ROLES
    },
    {
      path: ':cid/report',
      element: <ContainerReportLazy />,
      canAccess: AMP_ROLES
    },
    {
      path: ':cid/:source',
      element: <ContainerSourceLazy />,
      canAccess: AMP_ROLES
    },
    {
      path: ':cid/:source/:pageId',
      element: <ContainerSourcePageLazy />,
      canAccess: AMP_ROLES
    }
  ]
};

export const inventoryPages = {
  path: RoutePaths.INVENTORY,
  canAccess: AMP_ROLES,
  children: [
    {
      path: `:inventoryId/${RoutePaths.REPORT}`,
      element: <InventoryReportPage />,
      canAccess: AMP_ROLES
    }
  ]
};
