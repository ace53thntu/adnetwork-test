//---> Build-in Modules
import * as React from 'react';

//---> External Modules
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import {useQueryClient} from 'react-query';

//---> Internal Modules
import {PageAPIRequest} from 'api/page.api';
import {Tree, minimalTheme} from 'components/common/TreeLazy';
import {useGetContainers} from 'queries/container';
import {
  expandContainerRedux,
  expandSourceRedux,
  resetContainerRedux,
  selectContainerRedux,
  setContainersRedux,
  setFlagAlready,
  useContainerSelector
} from 'store/reducers/container';
import {CONTAINER_TREE_SOURCES} from './constants';
import {containersMapData} from './dto';
import {TreeContainerStyled} from './ContainersTree.styles';
import {GET_PAGES} from 'queries/page/constants';
import {DEFAULT_PAGINATION} from 'constants/misc';

const LIMIT = 2;

function ContainersTree(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryCache = useQueryClient();

  const {
    containers: containersRedux,
    selectedSource,
    container
  } = useContainerSelector();

  const {data: {items: containers = []} = {}, isFetching} = useGetContainers();

  React.useEffect(() => {
    if (!isFetching) {
      const items = containersMapData(containers);

      dispatch(setContainersRedux(items));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containers, isFetching]);

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
              }
            });
            if (res?.data?.items) {
              queryCache.setQueryData([GET_PAGES, parentId], res.data.items);
              const currentSourceData = res.data.items ?? [];
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

  return (
    <TreeContainerStyled>
      <Tree
        paginated
        pageLimit={containers?.length ?? LIMIT}
        theme={minimalTheme}
        nodes={containersRedux}
        Checkbox={() => null}
        loadChildren={loadChildren}
        selectCallback={handleSelect}
        toggleCallback={handleToggle}
      />
    </TreeContainerStyled>
  );
}

ContainersTree.propTypes = {};
ContainersTree.defaultProps = {};

export default ContainersTree;
