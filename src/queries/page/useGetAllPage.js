import {PageAPIRequest} from 'api/page.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_PAGES} from './constants';

/**
 * Hook for get Page by container from API by query
 */
export function useGetAllPage({containerId, enabled = false, params = {}}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_PAGES, containerId],
    () =>
      PageAPIRequest.getAllPage({
        params: {container_uuid: containerId, ...params},
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
