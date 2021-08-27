import {useQueryCache, useMutation, useQuery} from 'react-query';
import {ContainerAPIRequest} from 'api/container.api';
import {CONTAINERS} from './constants';

/**
 * Get containers
 */
export function useContainers({suspense = true, partnerId}) {
  return useQuery(
    [CONTAINERS, partnerId],
    () => ContainerAPIRequest.getAllContainer({}).then(res => res?.data),
    {
      suspense
    }
  );
}

export function useContainersLazy() {
  const cache = useQueryCache();

  return useMutation(
    () => {
      return new Promise(resolve => resolve('ok')); //containerService.getContainers({});
    },
    {
      onError: (err, newTodo, rollback) =>
        typeof rollback === 'function' ? rollback() : null,
      onSuccess: data => cache.setQueryData(CONTAINERS, data)
    }
  );
}
