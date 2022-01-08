import {useMemo} from 'react';

import {mappingApiToForm} from 'entities/Capping';

export const useGetDefaultCapping = capping => {
  return useMemo(() => {
    return mappingApiToForm({apiResp: capping});
  }, [capping]);
};
