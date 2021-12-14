import {PublisherAPIRequest} from 'api/publisher.api';
import {DEFAULT_PAGINATION} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useInfiniteQuery, useQuery} from 'react-query';

import {GET_PUBLISHERS} from './constants';

/**
 * Query get all publishers
 * @returns Array data publishers
 */
export function useGetPublishers() {
  return useQuery(
    GET_PUBLISHERS,
    () => PublisherAPIRequest.getAllPublisher({}).then(res => res?.data ?? []),
    {
      suspense: false
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
