import {RoutePaths} from 'constants/route-paths';
import {
  DomainGroupListPage,
  DomainListPage,
  KeywordListPage,
  PositionListPage,
  TrackerTemplateListPage
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
    },
    {
      path: `${RoutePaths.POSITION}`,
      children: [
        {
          path: '',
          element: <PositionListPage />
        }
      ]
    },
    {
      path: `${RoutePaths.TRACKER_TEMPLATE}`,
      children: [
        {
          path: '',
          element: <TrackerTemplateListPage />
        }
      ]
    }
  ]
};
