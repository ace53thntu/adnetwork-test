import {ContainerAPIRequest} from 'api/container.api';
import {useCancelRequest} from 'hooks';
import {useQuery} from 'react-query';

import {GET_CONTAINERS} from './constants';

export function useGetContainers({params, enabled = false}) {
  const {cancelToken} = useCancelRequest();
  return useQuery(
    GET_CONTAINERS,
    () =>
      ContainerAPIRequest.getAllContainer({
        params,
        options: {cancelToken}
      }).then(res => res?.data ?? []),
    {
      suspense: false,
      enabled
    }
  );
}
