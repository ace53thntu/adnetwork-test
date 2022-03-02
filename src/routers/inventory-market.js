import {RoutePaths} from 'constants/route-paths';
import {InventoryMarketLazy} from 'pages/inventory-market';
import {USER_ROLE} from 'pages/user-management/constants';

export const inventoryMarketPages = {
  path: RoutePaths.INVENTORY_MARKET,
  element: <InventoryMarketLazy />,
  canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.DSP]
};
