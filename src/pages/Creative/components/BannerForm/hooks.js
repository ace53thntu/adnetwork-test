import {usePrevious} from 'hooks/usePrevious';
import React from 'react';
import {CREATIVE_TYPES} from './constants';

const getWithAndHeight = watchValue => {
  return watchValue.value.split('x');
};

export const useCalculateAdSize = ({watch, setValue}) => {
  const watchAdSizeFormat = watch('ad_size_format');
  const watchWidth = watch('width');
  const watchHeight = watch('height');

  const prevWidth = usePrevious(watchWidth);
  const prevHeight = usePrevious(watchHeight);

  const setFormField = React.useCallback(
    (field, value) => {
      setValue(field, value, {
        shouldValidate: true,
        shouldDirty: false
      });
    },
    [setValue]
  );

  React.useEffect(() => {
    if (watchAdSizeFormat) {
      const [width, height] = getWithAndHeight(watchAdSizeFormat);
      setFormField('width', width);
      setFormField('height', height);
    }
  }, [setFormField, watchAdSizeFormat]);

  React.useEffect(() => {
    if (prevWidth && watchWidth !== prevWidth) {
      if (
        watchAdSizeFormat &&
        watchWidth !== watchAdSizeFormat?.value?.split('x')?.[0]
      ) {
        setFormField('ad_size_format', null);
      }
    }
  }, [prevWidth, setFormField, watchAdSizeFormat, watchWidth]);

  React.useEffect(() => {
    if (prevHeight && watchHeight !== prevHeight) {
      if (
        watchAdSizeFormat &&
        watchHeight !== watchAdSizeFormat?.value?.split('x')?.[1]
      ) {
        setFormField('ad_size_format', null);
      }
    }
  }, [prevHeight, setFormField, watchAdSizeFormat, watchHeight]);
};

export const useWatchCreativeType = ({watch}) => {
  const watchType = watch('type');

  if (watchType.value === CREATIVE_TYPES[0].value) {
    return true;
  } else {
    return false;
  }
};
