import {useMutation, useQueryCache} from 'react-query';
// import * as pageServices from 'services/pages';
import {fakePromise, PAGES} from './constants';

export default function useUpdatePage() {
  const cache = useQueryCache();

  return useMutation(
    ({pageId, data}) => fakePromise(), //pageServices.updatePage({pageId, data}).then(res => res.data),
    {
      throwOnError: true,
      onSuccess: async pageId => {
        await cache.invalidateQueries(PAGES);
      }
    }
  );
}
