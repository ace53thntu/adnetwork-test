import {WeekpartAPIRequest} from 'api/weekpart.api';
import {useQuery} from 'react-query';

import {GET_CAPPINGS} from './constants';

/**
 * Hook for get all Weekparts
 * @returns Promise
 */
export function useGetWeekparts() {
  return useQuery(
    GET_CAPPINGS,
    () => WeekpartAPIRequest.getAllWeekpart({}).then(res => res?.data ?? []),
    {
      suspense: false
    }
  );
}
