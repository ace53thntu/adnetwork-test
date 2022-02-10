import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {useGetPositions} from 'queries/position';
import {useMemo} from 'react';
import {getResponseData} from 'utils/helpers/misc.helpers';

export const usePositionOptions = () => {
  const {data} = useGetPositions({
    params: {
      per_page: DEFAULT_PAGINATION.perPage,
      page: 1
    },
    enabled: true
  });

  const positions = getResponseData(data, IS_RESPONSE_ALL);

  return useMemo(() => {
    const listData = positions?.map(item => {
      const {id, text} = item;
      return {value: id, label: text};
    });

    return listData || [];
  }, [positions]);
};
