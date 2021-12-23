import {RoutePaths} from 'constants/route-paths';
import {ReportDashboardPage} from 'pages/report-dashboard';

export const dashboardPages = {
  path: RoutePaths.DASHBOARD,
  children: [
    {
      path: '',
      element: <ReportDashboardPage />
      // canAccess: [MANAGER, TRADER]
    },
    {
      path: `${RoutePaths.PAGE}/:pageId`,
      element: <ReportDashboardPage />
    }
  ]
};
