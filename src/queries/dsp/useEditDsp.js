import {DspAPIRequest} from 'api/dsp.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_DSPS} from './constants';

/**
 * Update a Dsp
 */
export function useEditDsp() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({dspId, data}) =>
      DspAPIRequest.editDsp({
        id: dspId,
        data,
        options: {cancelToken}
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
