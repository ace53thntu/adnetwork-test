import {RoutePaths} from 'constants/route-paths';
import {
  AdvertiserListPage,
  AdvertiserReportPage
} from 'pages/Organization/Advertiser';
import {DspListPage, DspReportPage} from 'pages/Organization/Dsp';
import {
  PublisherListPage,
  PublisherReportPage
} from 'pages/Organization/Publisher';

export const organizationPages = {
  path: RoutePaths.ORGANIZATION,
  children: [
    {
      path: `${RoutePaths.ADVERTISER}`,
      children: [
        {
          path: '',
          element: <AdvertiserListPage />
        },
        {
          path: `:advertiserId/${RoutePaths.REPORT}`,
          element: <AdvertiserReportPage />
        }
      ]
    },
    {
      path: `${RoutePaths.PUBLISHER}`,
      children: [
        {
          path: '',
          element: <PublisherListPage />
        },
        {
          path: `:publisherId/${RoutePaths.REPORT}`,
          element: <PublisherReportPage />
        }
      ]
    },
    {
      path: `${RoutePaths.DSP}`,
      children: [
        {
          path: '',
          element: <DspListPage />
        },
        {
          path: `:dspId/${RoutePaths.REPORT}`,
          element: <DspReportPage />
        }
      ]
    }
  ]
};
