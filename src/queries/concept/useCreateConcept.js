import {ConceptAPI} from 'api/concept.api';
import {useCancelRequest} from 'hooks';
import {useMutation} from 'react-query';

export function useCreateConcept() {
  const {cancelToken} = useCancelRequest();

  return useMutation(
    data =>
      ConceptAPI.createConcept({
        data,
        options: {
          cancelToken
        }
      }).then(res => res),
    {
      onError: (err, variables, rollback) => {
        return typeof rollback === 'function' ? rollback() : null;
      }
    }
  );
}
