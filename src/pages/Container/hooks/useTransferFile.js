import {useQuery} from 'react-query';
import * as containerServices from 'services/container';
/**
 * Get event
 * @param {uuid} eventId - Event ID
 */
const fetchTransferFiles = cid =>
  containerServices.getTransferFiles({cid}).then(res => res.data);

export function useGetTransferFiles({containerId}) {
  return useQuery(containerId && [containerId], fetchTransferFiles, {
    suspense: false
  });
}
