import {useMutation, useQueryCache} from 'react-query';
// import {ContainerService} from 'core';
import {EVENT} from './constants';

/**
 * Update event property
 * @param {string} name
 * @param {uuid} eventId
 */
export function useUpdateProperty() {
  const cache = useQueryCache();

  return useMutation(
    ({name, propId, eventId}) => new Promise(resolve => resolve('ok')), //ContainerService.updateProperty({name, propId}).then(res => res?.data),
    {
      throwOnError: true,
      onSuccess: async (_, {eventId}) => {
        await cache.invalidateQueries([EVENT, eventId]);
      }
    }
  );
}
