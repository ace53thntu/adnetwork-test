import {RoutePaths} from 'constants/route-paths';
import {DomainListPage} from 'pages/setting';

export const settingPages = {
  path: RoutePaths.SETTING,
  children: [
    {
      path: `${RoutePaths.DOMAIN}`,
      children: [
        {
          path: '',
          element: <DomainListPage />
        }
      ]
    }
  ]
};
