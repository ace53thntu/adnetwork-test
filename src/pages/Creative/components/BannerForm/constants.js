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

export const INVOCATION_TAG_TYPES = [
  {
    label: 'Mustache',
    value: 'mustache',
    id: 'mustache'
  }
];

const uploaderConfig = getUploaderConfig();

export const CREATIVE_FILE_TYPES = uploaderConfig?.allowed_image_type?.map(
  type => ({
    id: type,
    value: type,
    label: type
  })
);

export const ALLOWED_VIDEO_TYPES = uploaderConfig?.allowed_video_type ?? [];
export const ALLOWED_IMAGE_TYPES = uploaderConfig?.allowed_image_type ?? [];
