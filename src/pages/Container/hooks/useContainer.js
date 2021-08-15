import {useMutation, useQuery} from 'react-query';
// import * as containerServices from 'services/container';
import {CONTAINER} from './constants';

/**
 * Get event
 * @param {uuid} eventId - Event ID
 */
const fetchContainer = (key, containerId) =>
  new Promise(resolve => resolve('ok')); //containerServices.getContainer({id: containerId}).then(res => res?.data);

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
