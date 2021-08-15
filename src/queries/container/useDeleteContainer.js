import {ContainerAPIRequest} from 'api/container.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_CONTAINERS} from './constants';

/**
 * Delete a Container
 */
export function useEditContainer() {
  const client = useQueryClient();

  return useMutation(
    ({cid}) =>
      ContainerAPIRequest.deleteContainer({
        id: cid
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_CONTAINERS]);
      }
    }
  );
}
