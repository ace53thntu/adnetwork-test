import {useQueryCache, useMutation} from 'react-query';
import * as containerServices from 'services/container';
import {CONTAINERS} from './constants';

export function useRemoveContainer() {
  const cache = useQueryCache();

  return useMutation(
    ({containerId}) =>
      containerServices.removeContainer(containerId).then(res => res),
    {
      onError: (err, newTodo, rollback) =>
        typeof rollback === 'function' ? rollback() : null,
      onSuccess: async () => {
        await cache.invalidateQueries(CONTAINERS, {
          refetchInactive: true
        });
      },
      throwOnError: true
    }
  );
}
