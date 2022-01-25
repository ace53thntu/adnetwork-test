import {KeywordAPIRequest} from 'api/keyword.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_KEYWORDS} from './constants';

/**
 * Delete a Keyword
 */
export function useDeleteKeyword() {
  const client = useQueryClient();

  return useMutation(
    ({keywordId}) =>
      KeywordAPIRequest.deleteKeyword({
        id: keywordId
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
