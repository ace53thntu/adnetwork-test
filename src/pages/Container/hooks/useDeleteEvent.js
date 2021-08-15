import {useMutation, useQueryCache} from 'react-query';
// import * as eventServices from 'services/events';
import {EVENTS, fakePromise} from './constants';

export default function useDeleteEvent() {
  const cache = useQueryCache();

  return useMutation(
    ({eventId}) => fakePromise(), //eventServices.deleteEventById({eventId}).then(res => res.data),
    {
      onSettled: data =>
        cache.invalidateQueries(EVENTS, {
          refetchInactive: true
        }),
      throwOnError: true
    }
  );
}
