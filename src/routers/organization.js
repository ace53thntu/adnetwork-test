import {RoutePaths} from 'constants/route-paths';
import {
  AdvertiserCreatePage,
  AdvertiserEditPage,
  AdvertiserListPage,
  AdvertiserViewPage
} from 'pages/Organization/Advertiser';
import {
  DspEditPage,
  DspListPage,
  DspCreatePage,
  DspViewPage
} from 'pages/Organization/Dsp';
import {
  PublisherListPage,
  PublisherCreatePage,
  PublisherEditPage,
  PublisherViewPage
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
          path: `create`,
          element: <AdvertiserCreatePage />,
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
          path: `create`,
          element: <PublisherCreatePage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.PUBLISHER]
        },
        {
          path: `:publisherId`,
          element: <PublisherViewPage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.PUBLISHER]
        },
        {
          path: `:publisherId/${RoutePaths.EDIT}`,
          element: <PublisherEditPage />,
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
          path: `create`,
          element: <DspCreatePage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.DSP]
        },
        {
          path: `:dspId`,
          element: <DspViewPage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.DSP]
        },
        {
          path: `:dspId/${RoutePaths.EDIT}`,
          element: <DspEditPage />,
          canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.DSP]
        }
      ],
      canAccess: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.DSP]
    }
  ]
};
