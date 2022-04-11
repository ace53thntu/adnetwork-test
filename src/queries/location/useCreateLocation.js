import {LocationAPIRequest} from 'api/location.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_LOCATIONS} from './constants';

/**
 * Create a Location
 */
export function useCreateLocation() {
  const client = useQueryClient();

  return useMutation(data => LocationAPIRequest.createLocation({data}), {
    onError: (err, variables, rollback) => {
      return typeof rollback === 'function' ? rollback() : null;
    },
    onSettled: () => {
      client.invalidateQueries([GET_LOCATIONS]);
    }
  });
}
