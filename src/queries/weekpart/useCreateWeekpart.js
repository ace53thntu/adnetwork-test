import {WeekpartAPIRequest} from 'api/weekpart.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_WEEKPARTS} from './constants';

/**
 * Create a Weekpart
 */
export function useCreateWeekpart() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data => WeekpartAPIRequest.createWeekpart({data, options: {cancelToken}}),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_WEEKPARTS]);
      }
    }
  );
}
