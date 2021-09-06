import {AdvertiserListPage} from 'pages/Organization/Advertiser';
import {PublisherListPagePage} from 'pages/Organization/Publisher';
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
        }
      ]
    },
    {
      path: '/publisher/*',
      children: [
        {
          path: '//*',
          element: <PublisherListPagePage />
        }
      ]
    }
  ]
};
