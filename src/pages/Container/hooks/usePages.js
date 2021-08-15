import {useMutation, useQueryCache, useQuery} from 'react-query';
// import * as containerService from 'services/container';
import {fakePromise, PAGE, PAGES} from './constants';

/**
 * Get container pages lazy
 */
export function usePagesLazy() {
  const cache = useQueryCache();

  return useMutation(
    ({cid, source}) => {
      return fakePromise(); //containerService.getContainerPages({cid, source});
    },
    {
      onError: (err, newTodo, rollback) =>
        typeof rollback === 'function' ? rollback() : null,
      onSuccess: data => cache.setQueryData(PAGES, data)
    }
  );
}

/**
 * Get page
 * @param {uuid} pageId - Page ID
 */
const fetchPage = (key, pageId) => fakePromise(); //containerService.getPage({pageId}).then(res => res.data);

export function useGetPage({pageId}) {
  return useQuery(pageId && [PAGE, pageId], fetchPage, {
    suspense: false
  });
}

const fetchPages = ({containerId, source = 'web'}) => fakePromise(); //containerService
//.getContainerPages({cid: containerId, source})
//.then(res => res.data);

export function useGetPages({containerId, source = 'web'}) {
  return useQuery(
    [PAGES, containerId, source],
    () => fetchPages({containerId, source}),
    {
      suspense: false
    }
  );
}
