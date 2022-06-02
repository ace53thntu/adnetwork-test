import {RoutePaths} from 'constants/route-paths';
import CreativePage from 'pages/Creative';
import {
  ConceptCreateLazy,
  ConceptDetailLazy,
  ConceptsLazy,
  CreativeLayout
} from 'pages/Creative/components';
import {USER_ROLE} from 'pages/user-management/constants';

export const creativePages = {
  path: RoutePaths.CREATIVE,
  element: <CreativeLayout />,
  canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.ADVERTISER],
  children: [
    {
      path: '',
      element: <ConceptsLazy />,
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.ADVERTISER]
    },
    {
      path: ':advertiserId',
      element: <ConceptsLazy />,
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.ADVERTISER]
    },
    {
      path: ':advertiserId/create',
      element: <ConceptCreateLazy />,
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.ADVERTISER]
    },
    {
      path: ':advertiserId/:conceptId',
      element: <ConceptDetailLazy />,
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.ADVERTISER]
    }
  ]
};
