import {useQuery} from 'react-query';
import * as containerServices from 'services/container';
/**
 * Get event
 * @param {uuid} eventId - Event ID
 */
const fetchImportFiles = cid =>
  containerServices.getImportFiles({cid}).then(res => res.data);

export function useGetImportFiles({containerId}) {
  return useQuery(containerId && [containerId], fetchImportFiles, {
    suspense: false
  });
}
