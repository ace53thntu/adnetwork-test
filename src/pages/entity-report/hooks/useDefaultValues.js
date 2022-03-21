//---> Build-in Modules
import React from 'react';

//---> Internal Modules
import {mappingApiToForm} from '../dto';

export const useDefaultValues = ({report}) => {
  return React.useMemo(() => {
    if (!report) {
      return null;
    }

    return mappingApiToForm({report});
  }, [report]);
};
