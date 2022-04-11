//---> External Modules
import {useQuery} from 'react-query';

//---> Internal Modules
import {LocationAPIRequest} from 'api/location.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {GET_LOCATIONS} from './constants';

/**
 * Query get all positions
 * @returns Array data positions
 */
export function useGetLocations({params, enabled, keepPreviousData}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_LOCATIONS, params],
    () =>
      LocationAPIRequest.getAllCountry({
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
