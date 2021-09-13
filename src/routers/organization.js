import {AdvertiserListPage} from 'pages/Organization/Advertiser';
import {DspListPage} from 'pages/Organization/Dsp';
import {PublisherListPagePage} from 'pages/Organization/Publisher';

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
    },
    {
      path: '/dsp/*',
      children: [
        {
          path: '//*',
          element: <DspListPage />
        }
      ]
    }
  ]
};
