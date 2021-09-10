import {WeekpartAPIRequest} from 'api/weekpart.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_CAPPINGS} from './constants';

/**
 * Update a Weekpart
 */
export function useEditWeekpart() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({weekpartId, data}) =>
      WeekpartAPIRequest.editWeekpart({
        id: weekpartId,
        data,
        options: {cancelToken}
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
