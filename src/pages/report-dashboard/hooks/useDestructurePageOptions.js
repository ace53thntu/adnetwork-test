import {validArray} from 'utils/helpers/dataStructure.helpers';

const {useMemo} = require('react');

export const useDestructurePageOptions = ({listData = []}) => {
  return useMemo(() => {
    if (!validArray({list: listData})) {
      return [];
    }

    return listData.map(item => {
      return {value: item?.uuid, label: item?.name, ...item};
    });
  }, [listData]);
};
