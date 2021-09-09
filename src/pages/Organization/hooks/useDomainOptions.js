import React from 'react';
import {validArray} from 'utils/helpers/dataStructure.helpers';

export const useDomainOptions = ({domainData = []}) => {
  return React.useMemo(() => {
    if (!validArray({list: domainData})) {
      return [];
    }

    return domainData?.map(item => ({
      ...item,
      value: item?.domain,
      label: item?.domain
    }));
  }, [domainData]);
};
