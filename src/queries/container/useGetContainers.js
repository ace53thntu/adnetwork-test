import {ContainerAPIRequest} from 'api/container.api';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useInfiniteQuery, useQuery} from 'react-query';
import {getResponsePagination} from 'utils/helpers/misc.helpers';

import {GET_CONTAINERS} from './constants';

export function useGetContainers({params, enabled = false}) {
  const {cancelToken} = useCancelRequest();
  return useQuery(
    GET_CONTAINERS,
    () =>
      ContainerAPIRequest.getAllContainer({
        params,
        options: {cancelToken, isResponseAll: IS_RESPONSE_ALL}
      }).then(res => res),
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
        options: {cancelToken, isResponseAll: IS_RESPONSE_ALL}
      }).then(res => res),
    {
      suspense: false,
      enabled,
      getNextPageParam: (apiRes, pages) => {
        console.log(
          '🚀 ~ file: useGetContainers.js ~ line 39 ~ useGetContainersInfinity ~ apiRes',
          apiRes
        );
        const total = getResponsePagination(apiRes)?.totalItems;

        const perPage =
          getResponsePagination(apiRes)?.perPage || DEFAULT_PAGINATION.perPage;
        const nextPage = Math.ceil(total / perPage);

        return nextPage > pages?.length ? pages?.length + 1 : false;
      }
    }
  );
}
