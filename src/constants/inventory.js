/**
 *@enum
 */
export const VideoMineTypes = {
  FLASH: 'video/x-flv',
  MPEG4: 'video/mp4',
  IPHONE_INDEX: 'application/x-mpegURL',
  IPHONE_SEGMENT: 'video/MP2T',
  THREE_GP_MOBILE: 'video/3gpp',
  QUICK_TIME: 'video/quicktime',
  A_V: 'video/x-msvideo',
  WINDOW_MEDIA: 'video/x-ms-wmv'
};

export const VideoMineOptions = [
  {value: VideoMineTypes.FLASH, label: 'Flash'},
  {value: VideoMineTypes.MPEG4, label: 'MPEG-4'},
  {value: VideoMineTypes.IPHONE_INDEX, label: 'iPhone index'},
  {value: VideoMineTypes.IPHONE_SEGMENT, label: 'iPhone segment'},
  {value: VideoMineTypes.THREE_GP_MOBILE, label: '3GP mobile'},
  {value: VideoMineTypes.QUICK_TIME, label: 'Quick time'},
  {value: VideoMineTypes.A_V, label: 'A/V Interleave'},
  {value: VideoMineTypes.WINDOW_MEDIA, label: 'Window media'}
];

export const MarketTypes = [
  {
    value: 'public',
    label: 'Public'
  },
  {
    value: 'private',
    label: 'Private'
  }
];

export const PriceEngines = [
  {
    value: 'ai',
    label: 'AI'
  },
  {
    value: 'price_fix',
    label: 'Price fix'
  },
  {
    value: 'field_rate_fix',
    label: 'Field rate fix'
  }
];
