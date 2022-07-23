import {AudienceAPIRequest} from 'api/audience.api';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {useQuery} from 'react-query';

import {AUDIENCE_DELIVERY_HISTORY} from './constants';

/**
 * Get list audiences transfer history
 */
export function useGetDeliveryTrackerHistory({params, enabled = false}) {
  return useQuery(
    [AUDIENCE_DELIVERY_HISTORY, params],
    () =>
      AudienceAPIRequest.getTransferHistories({
        params,
        options: {
          isResponseAll: IS_RESPONSE_ALL
        }
      }).then(res => res),
    {
      suspense: false,
      enabled
    }
  );
}
