import {audiencePages} from './audience';
import {campaignPages} from './campaign';
import {containerPages, inventoryPages} from './container';
import {creativePages} from './creative';
import {dashboardPages} from './dashboard';
import {inventoryMarketPages} from './inventory-market';
import {organizationPages} from './organization';
import {userManagementPages} from './user';

export const appRoutes = [
  dashboardPages,
  audiencePages,
  creativePages,
  campaignPages,
  containerPages,
  inventoryMarketPages,
  organizationPages,
  userManagementPages,
  inventoryPages
];
