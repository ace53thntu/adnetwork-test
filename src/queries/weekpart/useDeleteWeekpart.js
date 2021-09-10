import {WeekpartAPIRequest} from 'api/weekpart.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_CAPPINGS} from './constants';

/**
 * Delete a Weekpart
 */
export function useDeleteWeekpart() {
  const client = useQueryClient();

  return useMutation(
    ({weekpartId}) =>
      WeekpartAPIRequest.deleteWeekpart({
        id: weekpartId
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_CAPPINGS]);
      }
    }
  );
}
