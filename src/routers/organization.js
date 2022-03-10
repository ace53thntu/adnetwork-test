import {RoutePaths} from 'constants/route-paths';
import {
  AdvertiserListPage,
  AdvertiserReportPage,
  AdvertiserViewPage
} from 'pages/Organization/Advertiser';
import {DspListPage, DspReportPage, DspViewPage} from 'pages/Organization/Dsp';
import {
  PublisherListPage,
  PublisherReportPage
} from 'pages/Organization/Publisher';
import {USER_ROLE} from 'pages/user-management/constants';

export const organizationPages = {
  path: RoutePaths.ORGANIZATION,
  canAccess: [
    USER_ROLE.ADMIN,
    USER_ROLE.MANAGER,
    USER_ROLE.ADVERTISER,
    USER_ROLE.DSP,
    USER_ROLE.PUBLISHER
  ],
  children: [
    {
      path: `${RoutePaths.ADVERTISER}`,
      children: [
        {
          path: '',
          element: <AdvertiserListPage />
        },
        {
          path: `:advertiserId`,
          element: <AdvertiserViewPage />
        },
        {
          path: `:advertiserId/${RoutePaths.REPORT}`,
          element: <AdvertiserReportPage />
        }
      ],
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.ADVERTISER]
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
      ],
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.PUBLISHER]
    },
    {
      path: `${RoutePaths.DSP}`,
      children: [
        {
          path: '',
          element: <DspListPage />
        },
        {
          path: `:dspId`,
          element: <DspViewPage />
        },
        {
          path: `:dspId/${RoutePaths.REPORT}`,
          element: <DspReportPage />
        }
      ],
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.DSP]
    }
  ]
};
