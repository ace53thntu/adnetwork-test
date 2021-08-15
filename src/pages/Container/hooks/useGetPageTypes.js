import {useQuery} from 'react-query';
// import * as containerService from 'services/container';
import {fakePromise, PAGE_TYPES} from './constants';

/**
 * Get container pages lazy
 */
const fetchPageTypes = () => fakePromise(); //containerService.getPageTypes({}).then(res => res.data);

export function useGetPageTypes() {
  return useQuery(PAGE_TYPES, () => fetchPageTypes(), {
    suspense: false
  });
}
