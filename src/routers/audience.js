import {AudiencePage} from 'pages/Audience';
import {AudienceDetailPage} from 'pages/Audience/components/audience-detail';
import {AudienceListPage} from 'pages/Audience/components/audience-list';

export const audiencePages = {
  path: 'audiences',
  element: <AudiencePage />,
  children: [
    {
      path: '/',
      element: <AudienceListPage />
    },
    {
      path: '/:id',
      element: <AudienceDetailPage />
    }
  ]
};
