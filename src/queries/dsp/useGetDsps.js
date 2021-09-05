import {DspAPIRequest} from 'api/dsp.api';
import {useQuery} from 'react-query';

import {GET_DSPS} from './constants';

/**
 * Query get all DSPs
 * @returns Array data DSP
 */
export function useGetDsps() {
  return useQuery(
    GET_DSPS,
    () => DspAPIRequest.getAllDsp({}).then(res => res?.data ?? []),
    {
      suspense: false
    }
  );
}
