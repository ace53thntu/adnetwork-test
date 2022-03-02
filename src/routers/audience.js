import {RoutePaths} from 'constants/route-paths';
import {AudiencePageLazy} from 'pages/Audience';
import {AudienceDetailPageLazy} from 'pages/Audience/components/audience-detail';
import {AudienceListPageLazy} from 'pages/Audience/components/audience-list';
import {USER_ROLE} from 'pages/user-management/constants';

export const audiencePages = {
  path: RoutePaths.AUDIENCE,
  element: <AudiencePageLazy />,
  canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER],
  children: [
    {
      path: '',
      element: <AudienceListPageLazy />
    },
    {
      path: ':id',
      element: <AudienceDetailPageLazy />
    }
  ]
};
