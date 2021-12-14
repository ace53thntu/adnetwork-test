import {DspAPIRequest} from 'api/dsp.api';
import {DEFAULT_PAGINATION} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useInfiniteQuery, useQuery} from 'react-query';

import {GET_DSPS} from './constants';

/**
 * Query get all DSPs
 * @returns Array data DSP
 */
export function useGetDsps() {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    GET_DSPS,
    () =>
      DspAPIRequest.getAllDsp({options: {cancelToken}}).then(
        res => res?.data ?? []
      ),
    {
      suspense: false
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
        options: {cancelToken}
      }).then(res => res?.data ?? []),
    {
      suspense: false,
      enabled,
      getNextPageParam: (apiRes, pages) => {
        const total = apiRes?.total;
        const nextPage = Math.ceil(total / DEFAULT_PAGINATION.perPage);

        return nextPage > pages?.length ? pages?.length + 1 : false;
      }
    }
  );
}
