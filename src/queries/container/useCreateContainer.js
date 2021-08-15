import {ContainerAPIRequest} from 'api/container.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_CONTAINERS} from './constants';

/**
 * Create a Container
 */
export function useCreateAdvertiser() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data => ContainerAPIRequest.createContainer({data, options: {cancelToken}}),
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
