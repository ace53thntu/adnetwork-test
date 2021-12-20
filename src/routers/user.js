import {RoutePaths} from 'constants/route-paths';
import {UserListPage} from 'pages/user-management';

export const userManagementPages = {
  path: RoutePaths.USER,
  children: [
    {
      path: '',
      element: <UserListPage />
    }
  ]
};
