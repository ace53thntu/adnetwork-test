import {useMutation, useQueryCache} from 'react-query';
// import * as containerService from 'services/container';
import {CONTAINERS, fakePromise} from './constants';

export default function useDeleteContainer() {
  const cache = useQueryCache();

  return useMutation(
    ({containerId}) => fakePromise(), //containerService.deleteContainer({containerId}).then(res => res.data),
    {
      onSettled: data => {
        cache.invalidateQueries(CONTAINERS, {
          refetchInactive: true
        });
      },
      throwOnError: true
    }
  );
}
