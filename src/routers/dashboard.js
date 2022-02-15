import {RoutePaths} from 'constants/route-paths';
import {ReportDashboardPage} from 'pages/report-dashboard';
import {USER_ROLE} from 'pages/user-management/constants';

export const dashboardPages = {
  path: RoutePaths.DASHBOARD,
  canAccess: [
    USER_ROLE.MANAGER,
    USER_ROLE.MANAGER,
    USER_ROLE.ADVERTISER,
    USER_ROLE.PUBLISHER,
    USER_ROLE.DSP
  ],
  children: [
    {
      path: '',
      element: <ReportDashboardPage />
    },
    {
      path: `${RoutePaths.PAGE}/:pageId`,
      element: <ReportDashboardPage />
    }
  ]
};
