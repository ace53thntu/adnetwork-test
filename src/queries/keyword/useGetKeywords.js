import {KeywordAPIRequest} from 'api/keyword.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_KEYWORDS} from './constants';

/**
 * Hook for get all keywords
 * @returns Promise
 */
export function useGetKeywords({
  params,
  enabled = false,
  keepPreviousData = false
}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_KEYWORDS, params],
    () =>
      KeywordAPIRequest.getAllKeyword({
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
