import {DspAPIRequest} from 'api/dsp.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_DSPS} from './constants';

/**
 * Create a Dsp
 */
export function useCreateDsp() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data => DspAPIRequest.createDsp({data, options: {cancelToken}}),
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
