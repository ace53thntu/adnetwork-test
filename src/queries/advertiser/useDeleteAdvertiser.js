import {AdvertiserAPIRequest} from 'api/advertiser.api';
import {useMutation, useQueryClient} from 'react-query';

import {GET_ADVERTISERS} from './constants';

/**
 * Delete an Advertiser
 */
export function useDeleteAdvertiser() {
  const client = useQueryClient();

  return useMutation(
    ({advId}) =>
      AdvertiserAPIRequest.deleteAdvertiser({
        id: advId
      }),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_ADVERTISERS]);
      }
    }
  );
}
