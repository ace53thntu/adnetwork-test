import {DomainGroupAPIRequest} from 'api/domain-group.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_DOMAIN_GROUPS} from './constants';

/**
 * Delete a Domain
 */
export function useDeleteDomainGroup() {
  const client = useQueryClient();

  return useMutation(
    ({domainGroupId}) =>
      DomainGroupAPIRequest.deleteDomainGroup({
        id: domainGroupId
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_DOMAIN_GROUPS]);
      }
    }
  );
}
