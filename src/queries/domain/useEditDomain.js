import {DomainAPIRequest} from 'api/domain.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_DOMAIN, GET_DOMAINS} from './constants';

/**
 * Update a Domain
 */
export function useEditDomain() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({domainId, data}) =>
      DomainAPIRequest.editDomain({
        id: domainId,
        data,
        options: {cancelToken}
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: data => {
        client.invalidateQueries([GET_DOMAINS]);
        client.invalidateQueries([GET_DOMAIN, data?.uuid]);
      }
    }
  );
}
