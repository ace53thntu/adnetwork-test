import {useMutation, useQueryCache} from 'react-query';
// import * as containerService from 'services/container';
import {fakePromise, PAGE_TAGS} from './constants';

export default function useCreatePageTag() {
  const cache = useQueryCache();

  return useMutation(
    ({tag}) => fakePromise(), //containerService.createPageTag(tag).then(res => res.data),
    {
      onSuccess: async () => {
        await cache.invalidateQueries(PAGE_TAGS);
      },
      throwOnError: true
    }
  );
}
