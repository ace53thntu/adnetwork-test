import React from 'react';

export const useDestructureAudiences = ({pages = []}) => {
  return React.useMemo(() => {
    return pages?.reduce((acc, page) => {
      const {data: {items = []} = {}} = page;
      const itemsDestructure = items?.map(item => ({
        ...item,
        id: item?.uuid,
        status: !items?.status ? 'inactive' : item?.status
      }));
      return [...acc, ...itemsDestructure];
    }, []);
  }, [pages]);
};
