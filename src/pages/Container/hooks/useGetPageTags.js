import {useQuery} from 'react-query';
// import * as containerService from 'services/container';
import {fakePromise, PAGE_TAGS} from './constants';

/**
 * Get container pages lazy
 */
const fetchPageTags = () => fakePromise(); //containerService.getPageTags({}).then(res => res.data);

export function useGetPageTags() {
  return useQuery(PAGE_TAGS, () => fetchPageTags(), {
    suspense: false
  });
}
