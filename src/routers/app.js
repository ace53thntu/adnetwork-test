import Campaign from 'pages/Campaign';
import Dashboard from 'pages/Dashboard/Dashboard';

import {containerPages} from './container';
import {creativePages} from './creative';
import {inventoryMarketPages} from './inventory-market';
import {organizationPages} from './organization';
import {userManagementPages} from './user';

export const appRoutes = [
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/campaigns/*',
    element: <Campaign />
  },
  containerPages,
  inventoryMarketPages,
  organizationPages,
  userManagementPages,
  creativePages
];
