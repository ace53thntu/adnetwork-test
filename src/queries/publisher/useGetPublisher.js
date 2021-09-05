import {PublisherAPIRequest} from 'api/publisher.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_PUBLISHER} from './constants';

/**
 * Hook for get Publisher from API by query
 */
export function useGetPublisher(pubId) {
  const {cancelToken} = useCancelRequest();

  return useQuery(
    [GET_PUBLISHER, pubId],
    () =>
      PublisherAPIRequest.getPublisher({
        id: pubId,
        options: {
          cancelToken
        }
      }).then(res => res?.data ?? {}),
    {
      suspense: false,
      enabled: !!pubId
    }
  );
}
