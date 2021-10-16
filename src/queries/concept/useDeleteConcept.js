import {ConceptAPI} from 'api/concept.api';
import {useCancelRequest} from 'hooks';
import {useMutation} from 'react-query';

export function useDeleteConcept() {
  const {cancelToken} = useCancelRequest();

  return useMutation(
    conceptId =>
      ConceptAPI.deleteConcept({
        conceptId,
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
