import {useQuery} from 'react-query';
// import * as eventServices from 'services/events';
import {EVENT, fakePromise} from './constants';

/**
 * Get event
 * @param {uuid} eventId - Event ID
 */
const fetchEvent = (key, eventId) => fakePromise(); //eventServices.getEventById({eventId}).then(res => res.data);

export function useGetEvent({eventId}) {
  return useQuery(eventId && [EVENT, eventId], fetchEvent, {
    suspense: false
  });
}
