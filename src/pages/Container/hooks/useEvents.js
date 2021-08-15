import {useQuery} from 'react-query';
// import * as eventServices from 'services/events';
import {EVENTS, fakePromise} from './constants';

/**
 * Get container pages lazy
 */
const fetchEvents = ({pageId, page = 1, perPage = 5}) => {
  return fakePromise();
  // return eventServices
  //   .getEventsByPageId({pageId, page, perPage})
  //   .then(res => res?.data ?? []);
};

export function useEvents({pageId, page, perPage}) {
  return useQuery(
    [EVENTS, pageId, page, perPage],
    () => fetchEvents({pageId, page, perPage}),
    {
      suspense: false
    }
  );
}
