import {RoutePaths} from 'constants/route-paths';
import {ReportDashboardPage} from 'pages/report-dashboard';

export const dashboardPages = {
  path: RoutePaths.DASHBOARD,
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
