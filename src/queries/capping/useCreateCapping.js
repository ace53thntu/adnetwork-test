import {CappingAPIRequest} from 'api/capping.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_CAPPINGS} from './constants';

/**
 * Create a Capping
 */
export function useCreateCapping() {
  const client = useQueryClient();

  return useMutation(data => CappingAPIRequest.createCapping({data}), {
    onError: (err, variables, rollback) => {
      return typeof rollback === 'function' ? rollback() : null;
    },
    onSettled: () => {
      client.invalidateQueries([GET_CAPPINGS]);
    }
  });
}
