import {PublisherAPIRequest} from 'api/publisher.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_PUBLISHERS} from './constants';

/**
 * Delete a Publisher
 */
export function useDeletePublisher() {
  const client = useQueryClient();

  return useMutation(
    ({cid}) =>
      PublisherAPIRequest.deletePublisher({
        id: cid
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_PUBLISHERS]);
      }
    }
  );
}
