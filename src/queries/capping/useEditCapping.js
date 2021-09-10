import {CappingAPIRequest} from 'api/capping.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_CAPPINGS} from './constants';

/**
 * Update a Capping
 */
export function useEditCapping() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({cappingId, data}) =>
      CappingAPIRequest.editCapping({
        id: cappingId,
        data,
        options: {cancelToken}
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_CAPPINGS]);
      }
    }
  );
}
