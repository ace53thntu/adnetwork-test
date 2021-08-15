import {useMutation} from 'react-query';
// import {ContainerService} from 'core';

/**
 * Delete event property
 * @param {uuid} id - property id
 */
export function useDeleteProperty() {
  return useMutation(
    id => new Promise(resolve => resolve('ok')), //ContainerService.deleteProperty(id).then(res => res?.data),
    {
      throwOnError: true
    }
  );
}
