import {PageAPIRequest} from 'api/page.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_PAGE} from './constants';

/**
 * Hook for get Page from API by query
 */
export function useGetPage(pageId) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_PAGE, pageId],
    () =>
      PageAPIRequest.getPage({
        id: pageId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? {}),
    {
      suspense: false,
      enabled: !!pageId
    }
  );
}
