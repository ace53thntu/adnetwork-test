import {KeywordAPIRequest} from 'api/keyword.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_KEYWORDS} from './constants';

/**
 * Create a Keyword
 */
export function useCreateKeyword() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data => KeywordAPIRequest.createKeyword({data, options: {cancelToken}}),
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
