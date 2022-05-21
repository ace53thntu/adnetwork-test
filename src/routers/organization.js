import {RoutePaths} from 'constants/route-paths';
import {
  AdvertiserEditPage,
  AdvertiserListPage,
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
  children: [
    {
      path: `${RoutePaths.ADVERTISER}`,
      children: [
        {
          path: '',
          element: <AdvertiserListPage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.ADVERTISER]
        },
        {
          path: `:advertiserId`,
          element: <AdvertiserViewPage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.ADVERTISER]
        },
        {
          path: `:advertiserId/${RoutePaths.EDIT}`,
          element: <AdvertiserEditPage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.ADVERTISER]
        }
        // {
        //   path: `:advertiserId/${RoutePaths.REPORT}`,
        //   element: <AdvertiserReportPage />,
        //   canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.ADVERTISER]
        // }
      ],
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.ADVERTISER]
    },
    {
      path: `${RoutePaths.PUBLISHER}`,
      children: [
        {
          path: '',
          element: <PublisherListPage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.PUBLISHER]
        },
        {
          path: `:publisherId/${RoutePaths.REPORT}`,
          element: <PublisherReportPage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.PUBLISHER]
        }
      ],
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.PUBLISHER]
    },
    {
      path: `${RoutePaths.DSP}`,
      children: [
        {
          path: '',
          element: <DspListPage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.DSP]
        },
        {
          path: `:dspId`,
          element: <DspViewPage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.DSP]
        },
        {
          path: `:dspId/${RoutePaths.REPORT}`,
          element: <DspReportPage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.DSP]
        }
      ],
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.DSP]
    }
  ]
};
