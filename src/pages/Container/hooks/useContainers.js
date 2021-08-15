import {useQueryCache, useMutation, useQuery} from 'react-query';
// import * as containerService from 'services/container';
import {CONTAINERS} from './constants';

/**
 * Get containers
 */
export function useContainers({suspense = true, partnerId}) {
  return useQuery(
    [CONTAINERS, partnerId],
    () => new Promise(resolve => resolve('ok')), //containerService.getContainers({}).then(res => res.data),
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
