import {apiToForm} from 'entities/Tracker';
import React from 'react';

export const useDefaultValues = ({tracker = {}}) => {
  return React.useMemo(() => apiToForm({tracker}), [tracker]);
};
