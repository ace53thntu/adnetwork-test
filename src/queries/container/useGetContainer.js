import {ContainerAPIRequest} from 'api/container.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_CONTAINER} from './constants';

/**
 * Hook for get Container from API by query
 */
export function useGetContainer({containerId, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_CONTAINER, containerId],
    () =>
      ContainerAPIRequest.getContainer({
        id: containerId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? {}),
    {
      suspense: false,
      enabled
    }
  );
}
