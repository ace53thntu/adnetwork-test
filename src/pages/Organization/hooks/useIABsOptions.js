import {useMemo} from 'react';
import {validArray} from 'utils/helpers/dataStructure.helpers';

export const useIABsOptions = ({IABs = []}) => {
  return useMemo(() => {
    if (validArray({list: IABs})) {
      return IABs?.map(item => ({
        ...item,
        value: item?.code,
        label: item?.name
      }));
    }
    return [];
  }, [IABs]);
};
