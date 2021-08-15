import {useMutation, useQueryCache} from 'react-query';
// import * as containerService from 'services/container';
import {fakePromise, PAGES} from './constants';

export default function useDeletePage({containerId, tag}) {
  const cache = useQueryCache();

  return useMutation(
    ({pageId}) => fakePromise(), //containerService.removePage({pageId}).then(res => res.data),
    {
      onSuccess: async data => {
        await cache.invalidateQueries(PAGES);
      }
    }
  );
}
