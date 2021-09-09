import {DomainAPIRequest} from 'api/domain.api';
import {useQuery} from 'react-query';

import {GET_DOMAINS} from './constants';

/**
 * Hook for get all domains
 * @returns Promise
 */
export function useGetDomains() {
  return useQuery(
    GET_DOMAINS,
    () => DomainAPIRequest.getAllDomain({}).then(res => res?.data ?? []),
    {
      suspense: false
    }
  );
}
