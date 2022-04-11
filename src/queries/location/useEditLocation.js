import {LocationAPIRequest} from 'api/location.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_LOCATIONS, GET_LOCATION} from './constants';

/**
 * Update a Location
 */
export function useEditLocation(locationId) {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({locationId, data}) =>
      LocationAPIRequest.editLocation({
        id: locationId,
        data,
        options: {cancelToken}
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_LOCATIONS]);
        client.invalidateQueries([GET_LOCATION, locationId]);
      }
    }
  );
}
