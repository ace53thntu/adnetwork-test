import {Tree, minimalTheme} from 'components/common/TreeLazy';
import {
  CONTAINER_VIEWS,
  reloadTree,
  selectInventory,
  selectPage,
  selectContainer,
  setViewContainer
} from 'store/reducers/container';
import {PageAPIRequest} from 'api/page.api';
import {InventoryAPIRequest} from 'api/inventory.api';
import {ContainerAPIRequest} from 'api/container.api';
import {useCancelRequest} from 'hooks';
import useDeepCompareEffect, {
  useDeepCompareMemoize
} from 'hooks/useDeepCompareEffect';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {unSelectedChild} from 'pages/Container/utils';

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: 400,
    flexGrow: 1,
    maxWidth: 400
  },
  treeBox: {
    height: 400,
    overflow: 'auto'
  }
});

function ContainerTree() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {cancelToken} = useCancelRequest();

  const {shouldReloadTree, selectedContainer, view} = useSelector(
    state => state.containerReducer
  );

  const [treeData, setTreeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  const getContainerData = useCallback(
    async (page, perPage, name) => {
      return ContainerAPIRequest.getAllContainer({
        params: {page, per_page: perPage, name},
        options: {
          cancelToken
        }
      });
    },
    [cancelToken]
  );

  const getInventoryData = useCallback(
    async ({page, perPage, name, cid}) => {
      return InventoryAPIRequest.getInventoriesContainer({
        cid,
        params: {page, limit: perPage},
        options: {
          cancelToken
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    async function init() {
      const {data, headers} = await getContainerData(currentPage, 10, '');
      console.log('🚀 ~ file: index.js ~ line 77 ~ init ~ data', data);
      const resData = data?.items ?? [];
      const newData = resData.map(
        ({uuid: id, name, total_pages = 10}, idx) => ({
          id,
          name,
          description: '',
          children: [],
          page: 0,
          numChildren: total_pages,
          expanded: false,
          selected: false,
          isContainer: true
        })
      );

      setTreeData(prev => [...prev, ...newData]);
      setLastPage(
        headers?.['x-last-page'] ? parseInt(headers['x-last-page'], 10) : 0
      );
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (shouldReloadTree) {
      async function init() {
        const {data} = await getContainerData(1, 10, '');
        console.log('🚀 ~ file: index.js ~ line 104 ~ init ~ data', data);
        const resData = data?.items ?? [];
        const newData = resData.map(({uuid, name, total_pages = 0}) => ({
          id: uuid,
          name,
          description: '',
          children: [],
          page: 0,
          numChildren: total_pages,
          expanded: false,
          selected: false,
          isContainer: true
        }));

        setTreeData(newData);
        dispatch(reloadTree(false));
      }
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldReloadTree]);

  const loadChildren = useCallback(async (node, pageLimit, currentPage) => {
    if (node.isContainer) {
      try {
        const {
          data: {items: resData = []} = {}
        } = await PageAPIRequest.getAllPage({
          params: {
            page: currentPage,
            per_page: pageLimit,
            name: '',
            container_uuid: node?.id
          },
          options: {
            cancelToken
          }
        });

        const children = resData.map(({uuid, name, total_inventories = 0}) => ({
          id: uuid,
          name: name,
          description: '',
          children: [],
          numChildren: total_inventories,
          page: 0,
          expanded: false,
          selected: false,
          isPage: true,
          parentId: node.id
        }));

        return children;
      } catch (error) {}
    } else {
      try {
        const {data} = await getInventoryData({
          cid: node.parentId,
          page: currentPage,
          perPage: pageLimit
        });

        const resData = data?.data ?? [];

        const children = resData.map(({id, name}) => ({
          id,
          name: name,
          description: '',
          children: [],
          numChildren: 0,
          page: 0,
          expanded: false,
          selected: false,
          isInventory: true,
          parentId: node.id,
          containerId: node.parentId
        }));

        return children;
      } catch (error) {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMoreInRoot = useCallback(() => {
    if (lastPage > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, lastPage]);

  return (
    <div className={classes.treeBox}>
      {treeData?.length > 0 && (
        <TreeListView
          data={treeData}
          loadChildren={loadChildren}
          selectedContainer={selectedContainer}
          view={view}
          handleLoadMoreInRoot={handleLoadMoreInRoot}
          isLast={currentPage === lastPage}
        />
      )}
    </div>
  );
}

export default ContainerTree;

function TreeListView({
  data = [],
  loadChildren,
  selectedContainer,
  view,
  handleLoadMoreInRoot,
  isLast = false
}) {
  const dispatch = useDispatch();
  const [nodes, setNodes] = useState(data);

  useDeepCompareEffect(() => {
    if (selectedContainer) {
      const newNodes = [...nodes].map(item => ({
        ...item,
        selected:
          view === CONTAINER_VIEWS.containerDetail
            ? item.id === selectedContainer
            : false
      }));
      setNodes(newNodes);
    }
  }, [nodes, selectedContainer, view]);

  useDeepCompareEffect(() => {
    setNodes(data);
  }, [data]);

  const handleSelect = useCallback(
    (event, node, state) => {
      const {isContainer, isPage, isInventory, parentId, containerId} = node;
      if (isContainer) {
        const newNodes = [...nodes].map(item => {
          if (item.id === node.id) {
            return {
              ...item,
              ...node,
              ...state,
              children: [...item.children].map(child => unSelectedChild(child))
            };
          }
          return unSelectedChild(item);
        });
        setNodes(newNodes);
        dispatch(setViewContainer(CONTAINER_VIEWS.containerDetail));
        dispatch(selectContainer(node.id));
        dispatch(selectInventory(null));
        dispatch(selectPage(null));
      }
      if (isPage) {
        const newNodes = [...nodes].map(item => {
          if (item.id === parentId) {
            return {
              ...item,
              selected: false,
              children: [...item.children].map(child => {
                if (child.id === node.id) {
                  return {
                    ...child,
                    ...node,
                    ...state,
                    children: [...child.children].map(nest =>
                      unSelectedChild(nest)
                    )
                  };
                }
                return {
                  ...child,
                  selected: false,
                  children: [...child.children].map(nest =>
                    unSelectedChild(nest)
                  )
                };
              })
            };
          }
          return unSelectedChild(item);
        });
        setNodes(newNodes);
        dispatch(setViewContainer(CONTAINER_VIEWS.pageDetail));
        dispatch(selectPage(node.id));
        dispatch(selectContainer(containerId));
        dispatch(selectInventory(null));
      }
      if (isInventory) {
        const newNodes = [...nodes].map(item => {
          if (item.id === containerId) {
            return {
              ...item,
              children: [...item.children].map(child => {
                if (child.id === parentId) {
                  return {
                    ...child,
                    selected: false,
                    children: [...child.children].map(nestChild => {
                      if (nestChild.id === node.id) {
                        return {
                          ...nestChild,
                          ...node,
                          ...state
                        };
                      }
                      return {
                        ...nestChild,
                        selected: false
                      };
                    })
                  };
                }
                return {
                  ...child,
                  selected: false
                };
              })
            };
          }
          return {
            ...item,
            selected: false
          };
        });
        setNodes(newNodes);
        dispatch(setViewContainer(CONTAINER_VIEWS.inventoryDetail));
        dispatch(selectInventory(node.id));
        dispatch(selectPage(parentId));
        dispatch(selectContainer(containerId));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [useDeepCompareMemoize(nodes)]
  );

  const handleToggle = useCallback(
    (event, node, state) => {
      const {isContainer, isPage, parentId} = node;

      if (isContainer) {
        const newNodes = [...nodes].map(item => {
          if (item.id === node.id) {
            return {
              ...item,
              ...node,
              ...state
            };
          }
          return item;
        });
        setNodes(newNodes);
      }
      if (isPage) {
        const newNodes = [...nodes].map(item => {
          if (item.id === parentId) {
            return {
              ...item,
              children: [...item.children].map(child => {
                if (child.id === node.id) {
                  return {
                    ...child,
                    ...node,
                    ...state
                  };
                }
                return child;
              })
            };
          }
          return item;
        });
        setNodes(newNodes);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [useDeepCompareMemoize(nodes)]
  );

  return (
    <Tree
      nodes={JSON.parse(JSON.stringify(nodes))}
      loadChildren={loadChildren}
      pageLimit={3}
      theme={minimalTheme}
      paginated
      Checkbox={() => null}
      selectCallback={handleSelect}
      toggleCallback={handleToggle}
      handleLoadMoreInRoot={handleLoadMoreInRoot}
      isLast={isLast}
    />
  );
}
