import {useMutation, useQueryCache} from 'react-query';
// import * as containerService from 'services/container';
import {EVENTS, fakePromise} from './constants';

export default function useCreateEvent() {
  const cache = useQueryCache();

  return useMutation(
    ({pageId, data}) => fakePromise(), //containerService.createEvent({pageId, data}).then(res => res.data),
    {
      onSettled: data =>
        cache.invalidateQueries(EVENTS, {
          refetchInactive: true
        }),
      throwOnError: true
    }
  );
}
