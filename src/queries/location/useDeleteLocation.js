import {LocationAPIRequest} from 'api/location.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_LOCATIONS} from './constants';

/**
 * Delete a Location
 */
export function useDeleteLocation() {
  const client = useQueryClient();

  return useMutation(
    ({positionId}) =>
      LocationAPIRequest.deleteLocation({
        id: positionId
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_LOCATIONS]);
      }
    }
  );
}
