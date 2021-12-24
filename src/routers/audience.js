import {RoutePaths} from 'constants/route-paths';
import {AudiencePageLazy} from 'pages/Audience';
import {AudienceDetailPageLazy} from 'pages/Audience/components/audience-detail';
import {AudienceListPageLazy} from 'pages/Audience/components/audience-list';

export const audiencePages = {
  path: RoutePaths.AUDIENCE,
  element: <AudiencePageLazy />,
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
