import {RoutePaths} from 'constants/route-paths';
import {
  ContainerDetailLazy,
  ContainerLayout,
  ContainersLazy
} from 'pages/Container';
import {ContainerSourceLazy} from 'pages/Container/components/ContainerSource';
import {ContainerSourcePageLazy} from 'pages/Container/components/ContainerSourcePage';
import {InventoryReportPage} from 'pages/Container/components/inventory-report';

export const containerPages = {
  path: RoutePaths.CONTAINER,
  element: <ContainerLayout />,
  children: [
    {
      path: '',
      element: <ContainersLazy />
    },
    {
      path: ':cid',
      element: <ContainerDetailLazy />
    },
    {
      path: ':cid/:source',
      element: <ContainerSourceLazy />
    },
    {
      path: ':cid/:source/:pageId',
      element: <ContainerSourcePageLazy />
    }
  ]
};

export const inventoryPages = {
  path: RoutePaths.INVENTORY,
  children: [
    {
      path: `:inventoryId/${RoutePaths.REPORT}`,
      element: <InventoryReportPage />
    }
  ]
};
