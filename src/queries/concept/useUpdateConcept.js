import {ConceptAPI} from 'api/concept.api';
import {useCancelRequest} from 'hooks';
import {useMutation} from 'react-query';

export function useUpdateConcept() {
  const {cancelToken} = useCancelRequest();

  return useMutation(
    ({data, conceptId}) =>
      ConceptAPI.updateConcept({
        conceptId,
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
