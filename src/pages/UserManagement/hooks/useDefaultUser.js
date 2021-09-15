import React from 'react';
import {mappingApiToForm} from '../components/dto';

export const useDefaultUser = ({
  apiResp = {},
  languagesArr = [],
  rolesArr = [],
  advertisersArr = [],
  dspsArr = [],
  publishersArr = []
}) => {
  return React.useMemo(() => {
    const userData = mappingApiToForm({
      apiResp,
      languagesArr,
      rolesArr,
      advertisersArr,
      dspsArr,
      publishersArr
    });
    return userData;
  }, [advertisersArr, apiResp, dspsArr, languagesArr, publishersArr, rolesArr]);
};
