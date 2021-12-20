import {RoutePaths} from 'constants/route-paths';
import {AdvertiserListPage} from 'pages/Organization/Advertiser';
import {DspListPage} from 'pages/Organization/Dsp';
import {PublisherListPagePage} from 'pages/Organization/Publisher';

export const organizationPages = {
  path: RoutePaths.ORGANIZATION,
  children: [
    {
      path: `${RoutePaths.ADVERTISER}/*`,
      children: [
        {
          path: '//*',
          element: <AdvertiserListPage />
        }
      ]
    },
    {
      path: `${RoutePaths.PUBLISHER}/*`,
      children: [
        {
          path: '//*',
          element: <PublisherListPagePage />
        }
      ]
    },
    {
      path: `${RoutePaths.DSP}/*`,
      children: [
        {
          path: '//*',
          element: <DspListPage />
        }
      ]
    }
  ]
};
