import {KeywordListAPIRequest} from 'api/keyword-list.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_KEYWORD_LISTS} from './constants';

/**
 * Create a Keyword list
 */
export function useCreateKeywordList() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data =>
      KeywordListAPIRequest.createKeywordList({data, options: {cancelToken}}),
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
