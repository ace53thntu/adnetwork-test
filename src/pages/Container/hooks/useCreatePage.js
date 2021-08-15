import {useMutation, useQueryCache} from 'react-query';
// import * as containerService from 'services/container';
import {
  fakePromise,
  PAGES
  // PAGE_TAGS
} from './constants';

export default function useCreatePage(shouldRefetch = false) {
  const cache = useQueryCache();

  return useMutation(
    ({data}) => fakePromise(), //containerService.createPage({data}).then(res => res.data),
    {
      onSuccess: async () => {
        if (shouldRefetch) {
          await cache.invalidateQueries(PAGES);
        }
      },
      throwOnError: true
    }
  );
}
