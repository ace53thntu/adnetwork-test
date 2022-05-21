import {usePrevious} from 'hooks/usePrevious';
import React from 'react';

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
        shouldValidate: true
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
