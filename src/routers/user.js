import {UserListPage} from 'pages/UserManagement';

export const userManagementPages = {
  path: 'users',
  children: [
    {
      path: '',
      element: <UserListPage />
    }
  ]
};
