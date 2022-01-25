import {KeywordListAPIRequest} from 'api/keyword-list.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_KEYWORD_LISTS} from './constants';

/**
 * Delete a Keyword list
 */
export function useDeleteKeywordList() {
  const client = useQueryClient();

  return useMutation(
    ({keywordListId}) =>
      KeywordListAPIRequest.deleteKeywordList({
        id: keywordListId
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_KEYWORD_LISTS]);
      }
    }
  );
}
