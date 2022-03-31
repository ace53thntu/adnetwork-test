import {RoutePaths} from 'constants/route-paths';
import {
  DomainGroupListPage,
  DomainListPage,
  KeywordListPage,
  PositionListPage,
  TrackerListPage,
  TrackerTemplateListPage
} from 'pages/setting';
import {USER_ROLE} from 'pages/user-management/constants';

export const settingPages = {
  path: RoutePaths.SETTING,
  canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER],
  children: [
    {
      path: `${RoutePaths.DOMAIN}`,
      children: [
        {
          path: '',
          element: <DomainListPage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER]
        }
      ],
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER]
    },
    {
      path: `${RoutePaths.DOMAIN_GROUP}`,
      children: [
        {
          path: '',
          element: <DomainGroupListPage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER]
        }
      ],
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER]
    },
    {
      path: `${RoutePaths.KEYWORD_LIST}`,
      children: [
        {
          path: '',
          element: <KeywordListPage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER]
        }
      ],
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER]
    },
    {
      path: `${RoutePaths.POSITION}`,
      children: [
        {
          path: '',
          element: <PositionListPage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER]
        }
      ],
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER]
    },
    {
      path: `${RoutePaths.TRACKER_TEMPLATE}`,
      children: [
        {
          path: '',
          element: <TrackerTemplateListPage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER]
        }
      ],
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER]
    },
    {
      path: `${RoutePaths.TRACKER}`,
      children: [
        {
          path: '',
          element: <TrackerListPage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER]
        }
      ],
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER]
    }
  ]
};
