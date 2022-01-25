import {apiToForm} from 'entities/DomainGroup';
import React from 'react';

export const useDefaultValues = ({domainGroup = {}}) => {
  return React.useMemo(() => apiToForm({domainGroup}), [domainGroup]);
};
