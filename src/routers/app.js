import {audiencePages} from './audience';
import {containerPages, inventoryPages} from './container';
import {campaignPages} from './campaign';
import {creativePages} from './creative';
import {inventoryMarketPages} from './inventory-market';
import {organizationPages} from './organization';
import {userManagementPages} from './user';
import {dashboardPages} from './dashboard';

export const appRoutes = [
  dashboardPages,
  campaignPages,
  containerPages,
  inventoryMarketPages,
  organizationPages,
  userManagementPages,
  creativePages,
  audiencePages,
  inventoryPages
];
