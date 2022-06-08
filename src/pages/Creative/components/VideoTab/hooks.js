import {THIRD_PARTY_TAG_TYPES} from '../BannerForm/constants';
import {VideoServeTypes, VideoTypes} from './constants';

export const VAST = [
  {
    label: 'VAST URL',
    value: 'vast_url'
  }
];

export const useCheckLinearity = (watch, setValue) => {
  const watchLinearity = watch('linearity');

  const linearIsLinear = watchLinearity.value === VideoTypes[0].value;

  let thirdParties = THIRD_PARTY_TAG_TYPES;
  let defaultThirdPartyTagType = THIRD_PARTY_TAG_TYPES[0];

  if (linearIsLinear) {
    thirdParties = VAST;
    defaultThirdPartyTagType = VAST[0];
  } else {
    thirdParties = THIRD_PARTY_TAG_TYPES;
  }

  setValue('third_party_tag_type', defaultThirdPartyTagType);

  return {
    thirdParties,
    defaultThirdPartyTagType
  };
};

export const useCheckVideoType = watch => {
  const watchType = watch('type');

  if (watchType.value === VideoServeTypes[0].value) {
    return false;
  } else {
    return true;
  }
};
