import {AdvertiserAPIRequest} from 'api/advertiser.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useInfiniteQuery, useQuery} from 'react-query';
import {getResponsePagination} from 'utils/helpers/misc.helpers';

import {GET_ADVERTISERS} from './constants';

export function useGetAdvertisers({params = {}, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_ADVERTISERS, params],
    () =>
      AdvertiserAPIRequest.getAllAdvertiser({
        params,
        options: {cancelToken}
      }).then(res => res?.data || []),
    {
      suspense: false,
      enabled
    }
  );
}

export function useGetAdvertisersInfinity({params, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useInfiniteQuery(
    [GET_ADVERTISERS, params],
    ({pageParam = 1}) =>
      AdvertiserAPIRequest.getAllAdvertiser({
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
