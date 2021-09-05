import {
  AdvertiserCreatePage,
  AdvertiserEditPage,
  AdvertiserListPage
} from 'pages/Organization/Advertiser';
import React from 'react';

export const organizationPages = {
  path: '/organization',
  children: [
    {
      path: '/advertiser/*',
      children: [
        {
          path: '//*',
          element: <AdvertiserListPage />
        },
        {
          path: '/create',
          element: <AdvertiserCreatePage />
        },
        {
          path: '/:id',
          element: <AdvertiserEditPage />
        }
      ]
    }
  ]
};
