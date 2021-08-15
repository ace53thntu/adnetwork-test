import {useMutation} from 'react-query';
import {fakePromise} from './constants';
// import {ContainerService} from 'core';

/**
 * Delete event property
 * @param {uuid} id - property id
 */
export function useDeleteProperty() {
  return useMutation(
    id => fakePromise(), //ContainerService.deleteProperty(id).then(res => res?.data),
    {
      throwOnError: true
    }
  );
}
