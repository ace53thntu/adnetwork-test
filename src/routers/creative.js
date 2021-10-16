import CreativePage from 'pages/Creative';
import {
  ConceptCreate,
  ConceptDetail,
  Concepts,
  CreativeLayout
} from 'pages/Creative/components';

export const creativePages = {
  path: 'creative',
  element: <CreativeLayout />,
  children: [
    {
      path: '',
      element: <CreativePage />
    },
    {
      path: ':advertiserId',
      element: <Concepts />
    },
    {
      path: ':advertiserId/create',
      element: <ConceptCreate />
    },
    {
      path: ':advertiserId/:conceptId',
      element: <ConceptDetail />
    }
  ]
};
