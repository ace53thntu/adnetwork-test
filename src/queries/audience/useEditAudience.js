import {AudienceAPIRequest} from 'api/audience.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';

import {GET_AUDIENCES} from './constants';

/**
 * Edit an Audience
 */
export function useEditAudience() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    ({aid, data}) =>
      AudienceAPIRequest.editAudience({
        id: aid,
        data,
        options: {cancelToken}
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
