import {RoutePaths} from 'constants/route-paths';
import {UserListPage} from 'pages/user-management';
import {USER_ROLE} from 'pages/user-management/constants';
import {UserProfilePage} from 'pages/user-profile';

export const userManagementPages = {
  path: RoutePaths.USER,
  children: [
    {
      path: '',
      element: <UserListPage />,
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER]
    },
    {
      path: `${RoutePaths.PROFILE}`,
      element: <UserProfilePage />,
      canAccess: [
        USER_ROLE.ADMIN,
        USER_ROLE.MANAGER,
        USER_ROLE.DSP,
        USER_ROLE.PUBLISHER,
        USER_ROLE.ADVERTISER
      ]
    }
  ]
};
