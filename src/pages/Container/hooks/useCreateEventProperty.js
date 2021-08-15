import {useMutation} from 'react-query';
// import {ContainerService} from 'core';

/**
 * Create event property
 * @param {string} name
 * @param {uuid} eventId
 */
export function useCreateProperty() {
  return useMutation(
    ({eventId, name}) => new Promise(resolve => resolve('ok')),
    // ContainerService.createProperty({eventId, name}).then(res => res.data),
    {
      throwOnError: true
    }
  );
}
