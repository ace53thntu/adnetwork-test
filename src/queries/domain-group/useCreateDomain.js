import {DomainAPIRequest} from 'api/domain.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_DOMAINS} from './constants';

/**
 * Create a Domain
 */
export function useCreateDomain() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data => DomainAPIRequest.createDomain({data, options: {cancelToken}}),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_DOMAINS]);
      }
    }
  );
}
