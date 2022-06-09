import {THIRD_PARTY_TAG_TYPES} from '../BannerForm/constants';
import {ASSET_TYPES, getAssetAcceptFile} from '../NativeAdTab/constants';
import {VideoServeTypes, VideoTypes} from './constants';
import {ACCEPT_FILES} from '../Alternatives/constants';
import React from 'react';
import {usePrevious} from 'react-use';

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

export const useCheckLinearityForUploadFile = (watch, setValue, reset) => {
  const watchLinearity = watch('linearity');

  const linearIsLinear = watchLinearity.value === VideoTypes[0].value;

  const prevCount = usePrevious(watchLinearity);

  React.useEffect(() => {
    if (prevCount && prevCount?.value !== watchLinearity?.value) {
      console.log('diff');
      setValue('files', []);
    }
  }, [prevCount, watchLinearity, setValue]);

  if (linearIsLinear) {
    return {
      accept: getAssetAcceptFile(ASSET_TYPES[1].id)
    };
  } else {
    return {
      accept: ACCEPT_FILES
    };
  }
};
