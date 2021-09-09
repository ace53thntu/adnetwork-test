import {DomainAPIRequest} from 'api/domain.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_DOMAINS} from './constants';

/**
 * Update an Domain
 */
export function useEditDomain() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({advId, data}) =>
      DomainAPIRequest.editDomain({
        id: advId,
        data,
        options: {cancelToken}
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
