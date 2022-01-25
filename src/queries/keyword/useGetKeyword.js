import {KeywordAPIRequest} from 'api/keyword.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_KEYWORD} from './constants';

/**
 * Hook for get Keyword from API by query
 * @param keywordId - Keyword ID
 */
export function useGetKeyword({keywordId, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_KEYWORD, keywordId],
    () =>
      KeywordAPIRequest.getKeyword({
        id: keywordId,
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
