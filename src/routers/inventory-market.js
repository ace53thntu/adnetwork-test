import InventoryMarket from 'pages/InventoryMarket';

export const inventoryMarketPages = {
  path: 'inventory-market',
  element: <InventoryMarket />,
  children: [
    {
      path: '',
      element: <InventoryMarket />
    }
  ]
};
