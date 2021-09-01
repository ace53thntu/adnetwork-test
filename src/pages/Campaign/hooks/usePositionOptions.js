import {useGetPositions} from 'queries/position';
import {useMemo} from 'react';

export const usePositionOptions = () => {
  const {data: positions} = useGetPositions();

  return useMemo(() => {
    const listData = positions?.map(item => {
      const {id, text} = item;
      return {value: id, label: text};
    });

    return listData || [];
  }, [positions]);
};
