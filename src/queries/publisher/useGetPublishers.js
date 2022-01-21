import {PublisherAPIRequest} from 'api/publisher.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useInfiniteQuery, useQuery} from 'react-query';
import {getResponsePagination} from 'utils/helpers/misc.helpers';

import {GET_PUBLISHERS} from './constants';

/**
 * Query get all publishers
 * @returns Array data publishers
 */
export function useGetPublishers({
  params,
  enabled = false,
  keepPreviousData = false
}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_PUBLISHERS, params],
    () =>
      PublisherAPIRequest.getAllPublisher({
        params,
        options: {cancelToken, isResponseAll: IS_RESPONSE_ALL}
      }).then(res => res),
    {
      suspense: false,
      enabled,
      keepPreviousData
    }
  );
}

export function useGetPublishersInfinity({params, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useInfiniteQuery(
    [GET_PUBLISHERS, params],
    ({pageParam = 1}) =>
      PublisherAPIRequest.getAllPublisher({
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
