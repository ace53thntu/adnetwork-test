import {PublisherAPIRequest} from 'api/publisher.api';
import {useQuery} from 'react-query';

import {GET_PUBLISHERS} from './constants';

/**
 * Query get all publishers
 * @returns Array data publishers
 */
export function useGetPublishers() {
  return useQuery(
    GET_PUBLISHERS,
    () => PublisherAPIRequest.getAllPublisher({}).then(res => res?.data ?? []),
    {
      suspense: false
    }
  );
}
