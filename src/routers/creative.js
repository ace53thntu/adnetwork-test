import {RoutePaths} from 'constants/route-paths';
import CreativePage from 'pages/Creative';
import {
  ConceptCreateLazy,
  ConceptDetailLazy,
  ConceptsLazy,
  CreativeLayout
} from 'pages/Creative/components';

export const creativePages = {
  path: RoutePaths.CREATIVE,
  element: <CreativeLayout />,
  children: [
    {
      path: '',
      element: <CreativePage />
    },
    {
      path: ':advertiserId',
      element: <ConceptsLazy />
    },
    {
      path: ':advertiserId/create',
      element: <ConceptCreateLazy />
    },
    {
      path: ':advertiserId/:conceptId',
      element: <ConceptDetailLazy />
    }
  ]
};
