import React from 'react';

export const useDestructureAudiences = ({pages = []}) => {
  return React.useMemo(() => {
    return pages?.reduce((acc, item) => {
      const {data: {items = []} = {}} = item;
      return [...acc, ...items];
    }, []);
  }, [pages]);
};
