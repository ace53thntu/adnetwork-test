import {AudienceAPIRequest} from 'api/audience.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_AUDIENCE} from './constants';

/**
 * Hook for get Audience from API by query
 */
export function useGetAudience({audienceId, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_AUDIENCE, audienceId],
    () =>
      AudienceAPIRequest.getAudience({
        id: audienceId,
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
