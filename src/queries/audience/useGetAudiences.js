import {AudienceAPIRequest} from 'api/audience.api';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useInfiniteQuery, useQuery} from 'react-query';

import {AUDIENCES_INFINITY, GET_AUDIENCES} from './constants';

export function useGetAudiences({
  params,
  enabled = false,
  keepPreviousData = false
}) {
  return useQuery(
    [GET_AUDIENCES, params],
    () =>
      AudienceAPIRequest.getAllAudience({
        params,
        options: {isResponseAll: IS_RESPONSE_ALL}
      }).then(res => res),
    {
      suspense: false,
      enabled,
      keepPreviousData
    }
  );
}

export function useGetAudiencesInfinity({
  page = DEFAULT_PAGINATION.page,
  per_page = DEFAULT_PAGINATION.perPage,
  name = '',
  enabled = false,
  params = {},
  key = AUDIENCES_INFINITY
}) {
  const {cancelToken} = useCancelRequest();

  return useInfiniteQuery(
    [key, page, per_page, name, params],
    ({pageParam = 1}) =>
      AudienceAPIRequest.getAllAudience({
        params: {
          ...params,
          page: pageParam,
          per_page,
          name
        },
        options: {
          cancelToken,
          isResponseAll: IS_RESPONSE_ALL
        }
      }).then(res => res),
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
