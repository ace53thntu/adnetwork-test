import {IS_RESPONSE_ALL} from 'constants/misc';
import React from 'react';
import {getResponseData} from 'utils/helpers/misc.helpers';

export const useDestructureAudiences = ({data}) => {
  return React.useMemo(() => {
    const dataConverted = getResponseData(data, IS_RESPONSE_ALL);
    console.log(
      '🚀 ~ file: useDestructureAudiences.js ~ line 8 ~ returnReact.useMemo ~ dataConverted',
      dataConverted
    );
    return dataConverted?.map(item => ({
      ...item,
      id: item?.uuid,
      status: !item?.status ? 'inactive' : item?.status
    }));
  }, [data]);
};
