import {ContainerAPIRequest} from 'api/container.api';
//---> Internal Modules
import {PageAPIRequest} from 'api/page.api';
import {Tree, minimalTheme} from 'components/common/TreeLazy';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {GET_PAGES} from 'queries/page/constants';
//---> Build-in Modules
import * as React from 'react';
import {useQueryClient} from 'react-query';
//---> External Modules
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import {
  expandContainerRedux,
  expandSourceRedux,
  resetContainerRedux,
  selectContainerRedux,
  setContainersRedux,
  setFlagAlready,
  useContainerSelector
} from 'store/reducers/container';
import {
  getResponseData,
  getResponsePagination,
  isValidResponse
} from 'utils/helpers/misc.helpers';

import {TreeContainerStyled} from './ContainersTree.styles';
import {CONTAINER_TREE_SOURCES} from './constants';
import {containersMapData} from './dto';

function ContainersTree(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryCache = useQueryClient();

  const {
    containers: containersRedux,
    selectedSource,
    container,
    keyword,
    containerPage,
    containerTotalPage
  } = useContainerSelector();

  async function init(currentPage, search) {
    const params = {
      page: currentPage,
      per_page: DEFAULT_PAGINATION.perPage,
      sort: 'created_at DESC',
      status: 'active'
    };
    if (search?.length) {
      params.name = search;
    }
    const res = await ContainerAPIRequest.getAllContainer({
      params,
      options: {
        isResponseAll: IS_RESPONSE_ALL
      }
    });

    if (isValidResponse(res, IS_RESPONSE_ALL)) {
      const items = containersMapData(
        getResponseData(res, IS_RESPONSE_ALL),
        currentPage
      );
      dispatch(
        setContainersRedux(
          items,
          currentPage,
          getResponsePagination(res)?.totalItems
        )
      );
    } else {
      dispatch(setContainersRedux([], currentPage));
    }
  }

  React.useEffect(() => {
    init(1, keyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  React.useEffect(() => {
    return () => {
      dispatch(resetContainerRedux());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadChildren = React.useCallback(
    async (node, pageLimit, currentPage) => {
      const {isContainer, id, expanded, isSource} = node;

      if (isContainer) {
        if (expanded) {
          //
        } else {
          const {importCount, transferCount, source} = node;
          let children = [];
          if (!!source && Object.keys(source).length) {
            Object.keys(source).forEach((sourceKey, index) => {
              children.push({
                id: sourceKey,
                name: CONTAINER_TREE_SOURCES[sourceKey],
                children: [],
                numChildren: source[sourceKey],
                page: 0,
                expanded: false,
                selected: false,
                parentId: id,
                isSource: true
              });
            });
          }

          if (importCount > 0) {
            children.push({
              id: 'import',
              name: CONTAINER_TREE_SOURCES.import,
              children: [],
              numChildren: 0,
              page: 0,
              expanded: false,
              selected: false,
              parentId: id,
              isSource: true
            });
          }

          if (transferCount > 0) {
            children.push({
              id: 'transfer',
              name: CONTAINER_TREE_SOURCES.transfer,
              children: [],
              numChildren: 0,
              page: 0,
              expanded: false,
              selected: false,
              parentId: id,
              isSource: true
            });
          }
          return children;
        }
      }

      if (isSource) {
        if (!expanded) {
          const {parentId, id} = node;
          let children = [];
          try {
            const res = await PageAPIRequest.getAllPage({
              params: {
                limit: DEFAULT_PAGINATION.perPage,
                page: currentPage,
                container_uuid: parentId,
                source: id
              },
              options: {
                isResponseAll: IS_RESPONSE_ALL
              }
            });
            const data = getResponseData(res, IS_RESPONSE_ALL);
            if (data) {
              queryCache.setQueryData([GET_PAGES, parentId], data);
              const currentSourceData = data ?? [];
              currentSourceData.forEach((item, index) => {
                children.push({
                  id: item.uuid,
                  name: item.name,
                  children: [],
                  numChildren: 0,
                  page: 0,
                  expanded: false,
                  selected: false,
                  parentId: id,
                  isPage: true,
                  containerId: parentId
                });
              });
            }
          } catch (error) {
            //
          }
          return children;
        }
      }
    },
    [queryCache]
  );

  const handleToggle = React.useCallback((event, node, state) => {
    const {isContainer, parentId, id, isSource} = node;
    if (isContainer) {
      dispatch(expandContainerRedux(id, state));
    }
    if (isSource) {
      dispatch(expandSourceRedux(id, state, parentId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = React.useCallback(
    (event, node, state) => {
      const {isContainer, parentId, id, isSource, isPage, containerId} = node;
      if (isContainer) {
        navigate(id);
        if (selectedSource?.length) {
          dispatch(selectContainerRedux(id, container));
        }
      }
      if (isSource) {
        return;
      }
      if (isPage) {
        dispatch(setFlagAlready(false));
        navigate(`/container/${containerId}/${parentId}/${node.id}`);
      }
    },
    [navigate, selectedSource?.length, dispatch, container]
  );

  const totalPage = Math.ceil(containerTotalPage / DEFAULT_PAGINATION.perPage);

  const handleLoadMoreInRoot = React.useCallback(() => {
    if (totalPage > containerPage) {
      init(containerPage + 1, keyword);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerPage, totalPage, keyword]);

  return (
    <TreeContainerStyled>
      <Tree
        paginated
        pageLimit={DEFAULT_PAGINATION.perPage}
        theme={minimalTheme}
        nodes={containersRedux}
        Checkbox={() => null}
        loadChildren={loadChildren}
        selectCallback={handleSelect}
        toggleCallback={handleToggle}
        handleLoadMoreInRoot={handleLoadMoreInRoot}
        isLast={containerPage === totalPage}
      />
    </TreeContainerStyled>
  );
}

ContainersTree.propTypes = {};
ContainersTree.defaultProps = {};

export default ContainersTree;
