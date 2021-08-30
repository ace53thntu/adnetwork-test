import {ContainerAPIRequest} from 'api/container.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_CONTAINER_PAGES} from './constants';

/**
 * Hook for get Container from API by query
 */
export function useGetContainerPages(cid) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_CONTAINER_PAGES, cid],
    () =>
      ContainerAPIRequest.getContainerPages({
        id: cid,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? []),
    {
      suspense: false,
      enabled: !!cid
    }
  );
}
