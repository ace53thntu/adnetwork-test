import {DspAPIRequest} from 'api/dsp.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_DSP} from './constants';

/**
 * Hook for get Dsp from API by query
 */
export function useGetDsp(dspId, enabled = false) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_DSP, dspId],
    () =>
      DspAPIRequest.getDsp({
        id: dspId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? {}),
    {
      suspense: false,
      enabled
    }
  );
}
