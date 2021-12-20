import {RoutePaths} from 'constants/route-paths';
import InventoryMarket from 'pages/inventory-market';

export const inventoryMarketPages = {
  path: RoutePaths.INVENTORY_MARKET,
  element: <InventoryMarket />,
  children: [
    {
      path: '',
      element: <InventoryMarket />
    }
  ]
};
