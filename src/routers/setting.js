import {RoutePaths} from 'constants/route-paths';
import {
  DomainGroupListPage,
  DomainListPage,
  KeywordListPage
} from 'pages/setting';

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
    },
    {
      path: `${RoutePaths.DOMAIN_GROUP}`,
      children: [
        {
          path: '',
          element: <DomainGroupListPage />
        }
      ]
    },
    {
      path: `${RoutePaths.KEYWORD_LIST}`,
      children: [
        {
          path: '',
          element: <KeywordListPage />
        }
      ]
    }
  ]
};
