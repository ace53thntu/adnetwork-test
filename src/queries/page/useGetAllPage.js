import {PageAPIRequest} from 'api/page.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_PAGES} from './constants';

/**
 * Hook for get Page by container from API by query
 */
export function useGetAllPage({containerId, enabled = false, params = {}}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_PAGES, containerId, params],
    () =>
      PageAPIRequest.getAllPage({
        params: {container_uuid: containerId, ...params},
        options: {
          cancelToken,
          isResponseAll: IS_RESPONSE_ALL
        }
      }).then(res => res),
    {
      suspense: false,
      enabled
    }
  );
}
