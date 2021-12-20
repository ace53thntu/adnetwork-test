import Dashboard from 'pages/Dashboard/Dashboard';
import {audiencePages} from './audience';

import {containerPages} from './container';
import {campaignPages} from './campaign';
import {creativePages} from './creative';
import {inventoryMarketPages} from './inventory-market';
import {organizationPages} from './organization';
import {userManagementPages} from './user';

export const appRoutes = [
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  campaignPages,
  containerPages,
  inventoryMarketPages,
  organizationPages,
  userManagementPages,
  creativePages,
  audiencePages
];
