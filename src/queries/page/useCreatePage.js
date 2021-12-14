import {PageAPIRequest} from 'api/page.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_PAGES} from './constants';

/**
 * Create a Page
 */
export function useCreatePage(containerId) {
  console.log(
    '🚀 ~ file: useCreatePage.js ~ line 11 ~ useCreatePage ~ containerId',
    containerId
  );
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data => PageAPIRequest.createPage({data, options: {cancelToken}}),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_PAGES, containerId]);
      }
    }
  );
}
