import {getUploaderConfig} from 'utils/helpers/storeUploaderConfig.helpers';

export const ASSET_TYPES = [
  {
    id: 'title',
    label: 'Title',
    value: 'title'
  },
  {
    id: 'video',
    label: 'Video',
    value: 'video'
  },
  {
    id: 'imgdco',
    label: 'Image DCO',
    value: 'imgdco',
    isDisabled: true
  },
  {
    id: 'icon',
    label: 'Icon',
    value: 'icon'
  },
  {
    id: 'logo',
    value: 'logo',
    label: 'Logo'
  },
  {
    id: 'img',
    value: 'img',
    label: 'Image'
  },
  {
    id: 'sponsored',
    value: 'sponsored',
    label: 'Sponsored'
  },
  {
    id: 'desc',
    value: 'desc',
    label: 'Description'
  },
  {
    id: 'rating',
    value: 'rating',
    label: 'Rating'
  },
  {
    id: 'like',
    value: 'like',
    label: 'Like'
  },
  {
    id: 'downloads',
    value: 'downloads',
    label: 'Downloads'
  },
  {
    id: 'price',
    value: 'price',
    label: 'Price'
  },
  {
    id: 'saleprice',
    value: 'saleprice',
    label: 'Sale price'
  },
  {
    id: 'phone',
    value: 'phone',
    label: 'Phone'
  },
  {
    id: 'address',
    value: 'address',
    label: 'Address'
  },
  {
    id: 'desc2',
    value: 'desc2',
    label: 'Description 2'
  },
  {
    id: 'diplayurl',
    value: 'diplayurl',
    label: 'Display URL'
  },
  {
    id: 'ctatext',
    value: 'ctatext',
    label: 'CTA text'
  }
];

export const ASSET_TYPES_IS_FILE = ['video', 'imgdco', 'icon', 'logo', 'img'];

const uploaderConfig = getUploaderConfig();

export const ALLOWED_VIDEO_TYPES = uploaderConfig?.allowed_video_type ?? [];
export const ALLOWED_IMAGE_TYPES = uploaderConfig?.allowed_image_type ?? [];

export function getAssetAcceptFile(type) {
  const allowImage = ALLOWED_IMAGE_TYPES.join(',');
  const allowVideo = ALLOWED_VIDEO_TYPES.join(',');

  const accepts = {
    video: allowVideo,
    icon: allowImage,
    logo: allowImage,
    img: allowImage
  };

  return accepts[type];
}

const DEFAULT_LIMIT = 13631488; // 13Mb
export function getAssetLimitFileSize(type) {
  const imageLimitSize = uploaderConfig?.image_file ?? DEFAULT_LIMIT;
  const videoLimitSize = uploaderConfig?.video_file ?? DEFAULT_LIMIT;

  const limits = {
    video: videoLimitSize,
    icon: imageLimitSize,
    logo: imageLimitSize,
    img: imageLimitSize
  };

  return limits[type];
}
