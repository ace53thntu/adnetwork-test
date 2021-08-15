import {useMutation, useQueryCache} from 'react-query';
// import * as eventServices from 'services/events';
import {EVENTS, fakePromise} from './constants';

export default function useUpdateEvent() {
  const cache = useQueryCache();

  return useMutation(
    ({eventId, data}) => fakePromise(), //eventServices.updateEvent({eventId, data}).then(res => res.data),
    {
      throwOnError: true,
      onSuccess: async eventId => {
        cache.invalidateQueries(EVENTS);
      }
    }
  );
}
