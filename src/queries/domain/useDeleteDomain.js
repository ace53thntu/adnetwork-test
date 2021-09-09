import {DomainAPIRequest} from 'api/domain.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_DOMAINS} from './constants';

/**
 * Delete a Domain
 */
export function useDeleteDomain() {
  const client = useQueryClient();

  return useMutation(
    ({domainId}) =>
      DomainAPIRequest.deleteDomain({
        id: domainId
      }),
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
