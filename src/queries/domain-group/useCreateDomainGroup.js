import {DomainGroupAPIRequest} from 'api/domain-group.api';
import {useCancelRequest} from 'hooks';
import {useMutation, useQueryClient} from 'react-query';
import {GET_DOMAIN_GROUPS} from './constants';

/**
 * Create a Domain Group
 */
export function useCreateDomainGroup() {
  const {cancelToken} = useCancelRequest();
  const client = useQueryClient();

  return useMutation(
    data =>
      DomainGroupAPIRequest.createDomainGroup({data, options: {cancelToken}}),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      },
      onSettled: () => {
        client.invalidateQueries([GET_DOMAIN_GROUPS]);
      }
    }
  );
}
