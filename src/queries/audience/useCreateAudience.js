import {AudienceAPIRequest} from 'api/audience.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_AUDIENCES} from './constants';

/**
 * Create an Audience
 */
export function useCreateAudience() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data => AudienceAPIRequest.createAudience({data, options: {cancelToken}}),
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
