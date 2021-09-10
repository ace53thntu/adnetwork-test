import {useMemo} from 'react';
import {mappingApiToForm} from '../capping.dto';

export const useGetDefaultCapping = capping => {
  return useMemo(() => {
    const data = mappingApiToForm({apiResp: capping});
    return data;
  }, [capping]);
};
