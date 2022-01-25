import {KeywordListAPIRequest} from 'api/keyword-list.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_KEYWORD_LIST} from './constants';

/**
 * Hook for get Keyword List from API by query
 * @param keywordListId - Keyword List ID
 */
export function useGetKeywordList({keywordListId, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_KEYWORD_LIST, keywordListId],
    () =>
      KeywordListAPIRequest.getKeywordList({
        id: keywordListId,
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
