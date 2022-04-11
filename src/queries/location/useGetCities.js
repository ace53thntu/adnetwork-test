//---> External Modules
import {useQuery} from 'react-query';

//---> Internal Modules
import {LocationAPIRequest} from 'api/location.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {GET_CITIES} from './constants';

/**
 * Query get all cities
 * @returns Array data cities
 */
export function useGetCities({params, enabled, keepPreviousData}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_CITIES, params],
    () =>
      LocationAPIRequest.getAllCity({
        params,
        options: {cancelToken, isResponseAll: IS_RESPONSE_ALL}
      }).then(res => res),
    {
      keepPreviousData,
      suspense: false,
      enabled
    }
  );
}
