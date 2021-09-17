import {AudienceAPIRequest} from 'api/audience.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_AUDIENCES} from './constants';

/**
 * Delete an Audience
 */
export function useDeleteAudience() {
  const client = useQueryClient();

  return useMutation(
    ({aid}) =>
      AudienceAPIRequest.deleteAudience({
        id: aid
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_AUDIENCES]);
      }
    }
  );
}
