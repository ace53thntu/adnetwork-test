import {audiencePages} from './audience';
import {campaignPages} from './campaign';
import {containerPages, inventoryPages} from './container';
import {creativePages} from './creative';
import {dashboardPages} from './dashboard';
import {inventoryMarketPages} from './inventory-market';
import {organizationPages} from './organization';
import {userManagementPages} from './user';
import {settingPages} from './setting';

export const appRoutes = [
  dashboardPages,
  audiencePages,
  creativePages,
  campaignPages,
  inventoryMarketPages,
  containerPages,
  inventoryPages,
  organizationPages,
  userManagementPages,
  settingPages
];
