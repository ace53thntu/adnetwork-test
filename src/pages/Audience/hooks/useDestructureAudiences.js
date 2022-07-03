import {IS_RESPONSE_ALL} from 'constants/misc';
import React from 'react';
import {getResponseData} from 'utils/helpers/misc.helpers';

export const useDestructureAudiences = ({pages = []}) => {
  return React.useMemo(() => {
    return pages?.reduce((acc, page) => {
      const data = getResponseData(page, IS_RESPONSE_ALL);
      const itemsDestructure = data?.map(item => ({
        ...item,
        id: item?.uuid,
        status: !item?.status ? 'inactive' : item?.status
      }));
      return [...acc, ...itemsDestructure];
    }, []);
  }, [pages]);
};
