import {PageAPIRequest} from 'api/page.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_PAGES} from './constants';

/**
 * Hook for get Pages by Container from API by query
 */
export function useGetPagesByContainer(cid) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_PAGES, cid],
    () =>
      PageAPIRequest.getPagesByContainer({
        cid,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? {}),
    {
      suspense: false,
      enabled: !!cid
    }
  );
}
