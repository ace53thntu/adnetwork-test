import {PageAPIRequest} from 'api/page.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_PAGES} from './constants';

/**
 * Delete a Page
 */
export function useDeletePage() {
  const client = useQueryClient();

  return useMutation(
    ({pageId}) =>
      PageAPIRequest.deletePage({
        id: pageId
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
