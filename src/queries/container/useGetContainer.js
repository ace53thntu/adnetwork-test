import {ContainerAPIRequest} from 'api/container.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_CONTAINER} from './constants';

/**
 * Hook for get Container from API by query
 */
export function useGetContainer(cid) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_CONTAINER, cid],
    () =>
      ContainerAPIRequest.getContainer({
        id: cid,
        options: {
          cancelToken
        }
      }).then(res => res?.data?.data ?? {}),
    {
      suspense: false,
      enabled: !!cid
    }
  );
}
