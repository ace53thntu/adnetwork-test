import {useMutation, useQuery} from 'react-query';
import {ContainerAPIRequest} from 'api/container.api';
import {CONTAINER} from './constants';

/**
 * Get event
 * @param {uuid} containerId - Container ID
 */
const fetchContainer = (key, containerId) =>
  ContainerAPIRequest.getContainer({id: containerId}).then(res => res?.data);

export function useGetContainer({containerId}) {
  return useQuery(containerId && [CONTAINER, containerId], fetchContainer, {
    suspense: false
  });
}

export function useGetContainerLazy() {
  return useMutation(({containerId}) => fetchContainer('', containerId), {
    onError: (err, newTodo, rollback) =>
      typeof rollback === 'function' ? rollback() : null
  });
}
