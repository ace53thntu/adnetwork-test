import {ActivationRequestAPI} from 'api/activation';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {ACTIVATION_URL} from './constants';

/**
 * Hook for get Audience from API by query
 */
export function useGetActivation({params, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [ACTIVATION_URL, params],
    () =>
      ActivationRequestAPI.getActivation({
        params,
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
