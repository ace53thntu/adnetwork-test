import {KeywordAPIRequest} from 'api/keyword.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_KEYWORDS} from './constants';

/**
 * Update a Keyword
 */
export function useEditKeyword() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({keywordId, data}) =>
      KeywordAPIRequest.editKeyword({
        id: keywordId,
        data,
        options: {cancelToken}
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_KEYWORDS]);
      }
    }
  );
}
