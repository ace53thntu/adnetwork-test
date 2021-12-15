import React from 'react';
import {mappingApiToForm} from '../components/dto';

export const useDefaultUser = ({
  apiResp = {},
  languagesArr = [],
  rolesArr = []
}) => {
  return React.useMemo(() => {
    const userData = mappingApiToForm({
      apiResp,
      languagesArr,
      rolesArr
    });
    return userData;
  }, [apiResp, languagesArr, rolesArr]);
};
