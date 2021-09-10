import {WeekpartAPIRequest} from 'api/weekpart.api';
import {useQuery} from 'react-query';

import {GET_WEEKPARTS} from './constants';

/**
 * Hook for get all Weekparts
 * @returns Promise
 */
export function useGetWeekparts({strategyId}) {
  return useQuery(
    GET_WEEKPARTS,
    () =>
      WeekpartAPIRequest.getAllWeekpart({stategy_uuid: strategyId}).then(
        res => res?.data ?? []
      ),
    {
      suspense: false
    }
  );
}
