import {PageAPIRequest} from 'api/page.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_PAGES} from './constants';

/**
 * Update a Page
 */
export function useEditPage() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({cid, data}) =>
      PageAPIRequest.editPage({
        id: cid,
        data,
        options: {cancelToken}
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_PAGES]);
      }
    }
  );
}
