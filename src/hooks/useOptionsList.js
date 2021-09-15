import React from 'react';

export const useOptionsList = ({
  list = [],
  valueKey = 'uuid',
  labelKey = 'name'
}) => {
  return React.useMemo(() => {
    return list.map(item => ({
      ...item,
      value: item[valueKey],
      label: item[labelKey]
    }));
  }, [labelKey, list, valueKey]);
};
