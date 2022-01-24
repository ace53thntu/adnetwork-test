import {apiToForm} from 'entities/Domain';
import React from 'react';

export const useDefaultValues = ({domain = {}}) => {
  return React.useMemo(() => apiToForm({domain}), [domain]);
};
