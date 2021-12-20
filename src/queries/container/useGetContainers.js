import {ContainerAPIRequest} from 'api/container.api';
import {DEFAULT_PAGINATION} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useInfiniteQuery, useQuery} from 'react-query';

import {GET_CONTAINERS} from './constants';

export function useGetContainers({params, enabled = false}) {
  const {cancelToken} = useCancelRequest();
  return useQuery(
    GET_CONTAINERS,
    () =>
      ContainerAPIRequest.getAllContainer({
        params,
        options: {cancelToken}
      }).then(res => res?.data ?? []),
    {
      suspense: false,
      enabled
    }
  );
}

export function useGetContainersInfinity({params, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useInfiniteQuery(
    [GET_CONTAINERS, params],
    ({pageParam = 1}) =>
      ContainerAPIRequest.getAllContainer({
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
