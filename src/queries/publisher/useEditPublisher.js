import {PublisherAPIRequest} from 'api/publisher.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_PUBLISHERS} from './constants';

/**
 * Update a Publisher
 */
export function useEditPublisher() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({pubId, data}) =>
      PublisherAPIRequest.editPublisher({
        id: pubId,
        data,
        options: {cancelToken}
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
