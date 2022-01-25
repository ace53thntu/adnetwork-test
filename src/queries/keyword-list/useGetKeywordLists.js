import {KeywordListAPIRequest} from 'api/keyword-list.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_KEYWORD_LISTS} from './constants';

/**
 * Hook for get all keyword lists
 * @returns Promise
 */
export function useGetKeywordLists({
  params,
  enabled = false,
  keepPreviousData = false
}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_KEYWORD_LISTS, params],
    () =>
      KeywordListAPIRequest.getAllKeywordList({
        params,
        options: {cancelToken, isResponseAll: IS_RESPONSE_ALL}
      }).then(res => res),
    {
      suspense: false,
      enabled,
      keepPreviousData
    }
  );
}
