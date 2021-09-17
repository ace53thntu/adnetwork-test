import {AudienceAPIRequest} from 'api/audience.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_AUDIENCE} from './constants';

/**
 * Hook for get Audience from API by query
 */
export function useGetAudience(aid) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_AUDIENCE, aid],
    () =>
      AudienceAPIRequest.getAudience({
        id: aid,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? {}),
    {
      suspense: false,
      enabled: !!aid
    }
  );
}
