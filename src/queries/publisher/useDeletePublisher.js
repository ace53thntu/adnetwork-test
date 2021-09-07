import {PublisherAPIRequest} from 'api/publisher.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_PUBLISHERS} from './constants';

/**
 * Delete a Publisher
 */
export function useDeletePublisher() {
  const client = useQueryClient();

  return useMutation(
    ({pubId}) =>
      PublisherAPIRequest.deletePublisher({
        id: pubId
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
