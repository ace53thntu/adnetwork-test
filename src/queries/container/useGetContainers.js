import {ContainerAPIRequest} from 'api/container.api';
import {useQuery} from 'react-query';

import {GET_CONTAINERS} from './constants';

export function useGetContainers() {
  return useQuery(
    GET_CONTAINERS,
    () => ContainerAPIRequest.getAllContainer({}).then(res => res?.data ?? []),
    {
      suspense: false
    }
  );
}
