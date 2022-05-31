import {RoutePaths} from 'constants/route-paths';
import {
  DomainGroupListPage,
  DomainListPage,
  KeywordListPage,
  LocationListPage,
  PositionListPage,
  TrackerTemplateCreatePage,
  TrackerTemplateEditPage,
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
        },
        {
          path: '/create',
          element: <TrackerTemplateCreatePage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER]
        },
        {
          path: '/:trkTemplateId',
          element: <TrackerTemplateEditPage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER]
        }
      ],
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER]
    },
    {
      path: `${RoutePaths.LOCATION}`,
      children: [
        {
          path: '',
          element: <LocationListPage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER]
        }
      ],
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER]
    }
  ]
};
