import {apiToForm} from 'entities/Position';
import React from 'react';

export const useDefaultValues = ({position = {}}) => {
  return React.useMemo(() => apiToForm({position}), [position]);
};
