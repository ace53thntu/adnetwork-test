import {DomainAPIRequest} from 'api/domain.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_DOMAIN} from './constants';

/**
 * Hook for get Domain from API by query
 * @param domainId - Domain ID
 */
export function useGetDomain({domainId, enabled = false}) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_DOMAIN, domainId],
    () =>
      DomainAPIRequest.getDomain({
        id: domainId,
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
