import {DspAPIRequest} from 'api/dsp.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_DSPS} from './constants';

/**
 * Delete a Dsp
 */
export function useDeleteDsp() {
  const client = useQueryClient();

  return useMutation(
    ({dspId}) =>
      DspAPIRequest.deleteDsp({
        id: dspId
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_DSPS]);
      }
    }
  );
}
