import {CappingAPIRequest} from 'api/capping.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_CAPPINGS} from './constants';

/**
 * Create a Capping
 */
export function useCreateCapping() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data => CappingAPIRequest.createCapping({data, options: {cancelToken}}),
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
