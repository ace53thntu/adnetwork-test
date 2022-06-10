import { ContainerAPIRequest } from 'api/container.api';
import { DEFAULT_PAGINATION, IS_RESPONSE_ALL } from 'constants/misc';
import { useDispatch } from 'react-redux';
import { setSelectTreeDataRedux } from 'store/reducers/common';
import { setContainersRedux } from 'store/reducers/container';
import {
  getResponseData,
  getResponsePagination,
  isValidResponse
} from 'utils/helpers/misc.helpers';

import { containersMapData } from '../components/Tree/dto';
import { getAllContainerTreeData } from '../utils';

export function useRefreshContainerTree() {
  const dispatch = useDispatch();

  async function refresh() {
    const res = await ContainerAPIRequest.getAllContainer({
      params: {
        page: 1,
        per_page: DEFAULT_PAGINATION.perPage,
        sort: 'created_at DESC'
      },
      options: {
        isResponseAll: IS_RESPONSE_ALL
      }
    });

    if (isValidResponse(res, IS_RESPONSE_ALL)) {
      const items = containersMapData(getResponseData(res, IS_RESPONSE_ALL), 1);
      const total = getResponsePagination(res)?.totalItems;
      dispatch(setContainersRedux(items, 1, total));
    }
  }

  async function refreshTree() {
    const treeData = await getAllContainerTreeData();

    dispatch(setSelectTreeDataRedux(treeData));
  }

  return {
    refresh,
    refreshTree
  };
}
