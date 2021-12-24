import {RoutePaths} from 'constants/route-paths';
import {UserListPage} from 'pages/user-management';
import UserProfile from 'pages/user-profile';

export const userManagementPages = {
  path: RoutePaths.USER,
  children: [
    {
      path: '',
      element: <UserListPage />
    },
    {
      path: `${RoutePaths.PROFILE}`,
      element: <UserProfile />
    }
  ]
};
