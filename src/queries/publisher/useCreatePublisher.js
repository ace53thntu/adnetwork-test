import {PublisherAPIRequest} from 'api/publisher.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_PUBLISHERS} from './constants';

/**
 * Create a Publisher
 */
export function useCreatePublisher() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data => PublisherAPIRequest.createPublisher({data, options: {cancelToken}}),
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
