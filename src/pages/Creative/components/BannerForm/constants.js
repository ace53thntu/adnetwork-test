import {getUploaderConfig} from 'utils/helpers/storeUploaderConfig.helpers';

export const CREATIVE_TYPES = [
  {
    label: 'Third party',
    value: 'third_party',
    id: 'third_party'
  },
  {
    label: 'First party',
    value: 'first_party',
    id: 'first_party'
  }
];

export const THIRD_PARTY_TAG_TYPES = [
  {
    label: 'Mustache',
    value: 'mustache',
    id: 'mustache'
  }
];

export const ASSET_TYPES_IS_FILE = ['video', 'imgdco', 'icon', 'logo', 'img'];

const uploaderConfig = getUploaderConfig();

export const CREATIVE_FILE_TYPES =
  uploaderConfig?.allowed_image_type?.map(type => ({
    id: type,
    value: type,
    label: type
  })) ?? [];

export const ALLOWED_VIDEO_TYPES = uploaderConfig?.allowed_video_type ?? [];
export const ALLOWED_IMAGE_TYPES = uploaderConfig?.allowed_image_type ?? [];

export const PLATFORM_OPTIONS = [
  {
    id: 'web',
    label: 'Web',
    value: 'web'
  },
  {
    id: 'mobile-web',
    label: 'Mobile Web',
    value: 'mobile web'
  },
  {
    id: 'ios',
    label: 'iOS',
    value: 'iOS'
  },
  {
    id: 'android',
    label: 'Android',
    value: 'android'
  },
  {
    id: 'smarttv',
    label: 'SmartTV',
    value: 'smarttv'
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: 'instagram'
  }
];

export const ALTERNATIVE_PLAY_OPTIONS = [
  {
    id: 'single',
    label: 'Single',
    value: 'single'
  },
  {
    id: 'evenly',
    label: 'Evenly',
    value: 'evenly'
  },
  {
    id: 'weighted',
    label: 'Weighted',
    value: 'weighted'
  },
  {
    id: 'sequential',
    label: 'Sequential',
    value: 'sequential'
  },
  {
    id: 'optimized',
    label: 'Optimized',
    value: 'optimized'
  }
];

export const AD_SIZE_FORMAT_OPTIONS = [
  {
    label: 'Square and rectangle',
    options: [
      {
        id: '200x200',
        label: 'Small square: 200 x 200',
        value: '200x200'
      },
      {
        id: '240x400',
        label: 'Vertical rectangle: 240 x 400',
        value: '240x400'
      },
      {
        id: '250x250',
        label: 'Square: 250 x 250',
        value: '250x250'
      },
      {
        id: '250x360',
        label: 'Triple widescreen: 250 x 360',
        value: '250x360'
      },
      {
        id: '300x250',
        label: 'Inline rectangle: 300 x 250',
        value: '300x250'
      },
      {
        id: '336x280',
        label: 'Large rectangle: 336 x 280',
        value: '336x280'
      },
      {
        id: '580x400',
        label: 'Net board: 580 x 400',
        value: '580x400'
      }
    ]
  },
  {
    label: 'Skyscraper',
    options: [
      {
        id: '120x600',
        label: 'Skyscraper: 120 x 600',
        value: '120x600'
      },
      {
        id: '160x600',
        label: 'Wide skyscraper: 160 x 600',
        value: '160x600'
      },
      {
        id: '300x600',
        label: 'Half-page ad: 300 x 600',
        value: '300x600'
      },
      {
        id: '300x1050',
        label: 'Portrait: 300 x 1050',
        value: '300x1050'
      }
    ]
  },
  {
    label: 'Leader board',
    options: [
      {
        id: '468x60',
        label: 'Banner: 468 x 60',
        value: '468x60'
      },
      {
        id: '728x90',
        label: 'Leader board: 728 x 90',
        value: '728x90'
      },
      {
        id: '930x180',
        label: 'Top banner: 930 x 180',
        value: '930x180'
      },
      {
        id: '970x90',
        label: 'Large leader board: 970 x 90',
        value: '970x90'
      },
      {
        id: '970x250',
        label: 'Billboard: 970 x 250',
        value: '970x250'
      },
      {
        id: '980x120',
        label: 'Panorama: 980 x 120',
        value: '980x120'
      }
    ]
  },
  {
    label: 'Mobile',
    options: [
      {
        id: '300x50',
        label: 'Mobile banner: 300 x 50',
        value: '300x50'
      },
      {
        id: '320x50',
        label: 'Mobile banner: 320 x 50',
        value: '320x50'
      },
      {
        id: '320x100',
        label: 'Large mobile banner: 320 x 100',
        value: '320x100'
      }
    ]
  },
  {
    label: 'Video',
    options: [
      {
        id: '640x480',
        label: 'Video SD: 640 x 480',
        value: '640x480'
      },
      {
        id: '1280x720',
        label: 'Video HD: 1280 x 720',
        value: '1280x720'
      },
      {
        id: '1920x1080',
        label: 'Video Full HD: 1920 x 1080',
        value: '1920x1080'
      },
      {
        id: '2560x1440',
        label: 'Video Quad HD: 2560 x 1440',
        value: '2560x1440'
      },
      {
        id: '3840x2160',
        label: 'Video Ultra HD: 3840 x 2160',
        value: '3840x2160'
      },
      {
        id: '7680x4320',
        label: 'Video Full Ultra HD: 7680 x 4320',
        value: '7680x4320'
      }
    ]
  }
];
