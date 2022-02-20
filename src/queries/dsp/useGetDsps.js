import {DspAPIRequest} from 'api/dsp.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useInfiniteQuery, useQuery} from 'react-query';
import {getResponsePagination} from 'utils/helpers/misc.helpers';

import {GET_DSPS} from './constants';

/**
 * Query get all DSPs
 * @returns Array data DSP
 */
export function useGetDsps({
  params,
  enabled = false,
  keepPreviousData = false
}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_DSPS, params],
    () =>
      DspAPIRequest.getAllDsp({
        params,
        options: {cancelToken, isResponseAll: IS_RESPONSE_ALL}
      }).then(res => res),
    {
      suspense: false,
      keepPreviousData,
      enabled
    }
  );
}

export function useGetDspsInfinity({params, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useInfiniteQuery(
    [GET_DSPS, params],
    ({pageParam = 1}) =>
      DspAPIRequest.getAllDsp({
        params: {...params, page: pageParam},
        options: {cancelToken, isResponseAll: IS_RESPONSE_ALL}
      }).then(res => res),
    {
      suspense: false,
      enabled,
      getNextPageParam: (apiRes, pages) => {
        const nextPage = getResponsePagination(apiRes, IS_RESPONSE_ALL)
          ?.nextPage;

        return nextPage > pages?.length ? pages?.length + 1 : false;
      }
    }
  );
}
