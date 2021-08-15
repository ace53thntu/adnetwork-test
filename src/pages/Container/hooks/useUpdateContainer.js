import {useMutation, useQueryCache} from 'react-query';
// import * as containerServices from 'services/container';
import {CONTAINERS, fakePromise} from './constants';

export default function useUpdateContainer() {
  const cache = useQueryCache();

  return useMutation(
    ({cid, data}) => fakePromise(), //containerServices.updateContainer({cid, data}).then(res => res.data),
    {
      throwOnError: true,
      onSuccess: async cid => {
        cache.invalidateQueries(CONTAINERS, {
          refetchInactive: true
        });
      }
    }
  );
}
