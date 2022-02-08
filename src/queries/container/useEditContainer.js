import {ContainerAPIRequest} from 'api/container.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_CONTAINER, GET_CONTAINERS} from './constants';

/**
 * Update a Container
 */
export function useEditContainer(cid) {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({cid, data}) =>
      ContainerAPIRequest.editContainer({
        id: cid,
        data,
        options: {cancelToken}
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_CONTAINERS]);
        client.invalidateQueries([GET_CONTAINER, cid]);
      }
    }
  );
}
