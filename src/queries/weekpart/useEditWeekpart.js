import {WeekpartAPIRequest} from 'api/weekpart.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_WEEKPARTS} from './constants';

/**
 * Update a Weekpart
 */
export function useEditWeekpart() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({weekPartId, data}) =>
      WeekpartAPIRequest.editWeekpart({
        id: weekPartId,
        data,
        options: {cancelToken}
      }),
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
