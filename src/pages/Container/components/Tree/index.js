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
import {ContainerAPIRequest} from 'api/container.api';
import {useCancelRequest} from 'hooks';
import useDeepCompareEffect, {
  useDeepCompareMemoize
} from 'hooks/useDeepCompareEffect';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {unSelectedChild} from 'pages/Container/utils';

import {makeStyles} from '@material-ui/core/styles';
import {useNavigate} from 'react-router';
import {TAG_FROM_SOURCE} from '../ContainerTree/constants';

const useStyles = makeStyles({
  root: {
    height: '100%',
    flexGrow: 1,
    maxWidth: 400
  },
  treeBox: {
    height: 'calc(100vh - 220px)',
    overflow: 'auto'
  }
});

const PAGE_LIMIT = 3;

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
          isContainer: true,
          containerId: uuid
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
        console.log('---- resData getAllPage', resData);
        // Destructure pages data
        let objMapping = {};
        let listSource = [];

        resData?.forEach(element => {
          const makeKey = element.source;
          if (!objMapping[makeKey]) {
            objMapping[makeKey] = [];
          }

          objMapping[makeKey].push({
            ...element
          });
        });
        console.log(objMapping);

        Object.entries(objMapping).forEach(([sourceKey, pagesBySource]) => {
          const destructurePages = pagesBySource?.map(pageItem => ({
            ...pageItem,
            isPage: true,
            containerId: node?.id,
            id: pageItem?.uuid
          }));
          listSource.push({
            [sourceKey]: destructurePages,
            name: sourceKey
          });
        });

        console.log('=========== listSource', listSource);

        const children = listSource?.map((item, idx) => ({
          id: `pr-${idx + 1}`,
          name: item?.name,
          description: '',
          children: item[item?.name] || [],
          numChildren: item[item?.name]?.length,
          page: 0,
          expanded: false,
          selected: false,
          isPage: true,
          parentId: node.id,
          isSource: true
        }));

        return children;
      } catch (error) {}
    } else {
      try {
        console.log('===== node', node);
        const children = [];
        // const children = node?.map(({id, name}) => ({
        //   id,
        //   name: name,
        //   description: '',
        //   children: [],
        //   numChildren: 0,
        //   page: 0,
        //   expanded: false,
        //   selected: false,
        //   isInventory: true,
        //   parentId: node.id,
        //   containerId: node.parentId
        // }));

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
  const navigate = useNavigate();

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
      console.log('🚀 ~ file: index.js ~ line 267 ~ node', node);
      const {
        isContainer,
        isPage,
        isSource,
        parentId,
        containerId,
        id,
        source
      } = node;
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
        navigate(`/container/${id}`);
      }
      if (isSource) {
        console.log('🚀 ~ file: index.js ~ line 345 ~ isSource', isSource);
        const {children} = node;
        const {containerId, source, id} = children?.[0];
        // const newNodes = [...nodes].map(item => {
        //   if (item.id === containerId) {
        //     return {
        //       ...item,
        //       children: [...item.children].map(child => {
        //         if (child.id === parentId) {
        //           return {
        //             ...child,
        //             selected: false,
        //             children: [...child.children].map(nestChild => {
        //               if (nestChild.id === node.id) {
        //                 return {
        //                   ...nestChild,
        //                   ...node,
        //                   ...state
        //                 };
        //               }
        //               return {
        //                 ...nestChild,
        //                 selected: false
        //               };
        //             })
        //           };
        //         }
        //         return {
        //           ...child,
        //           selected: false
        //         };
        //       })
        //     };
        //   }
        //   return {
        //     ...item,
        //     selected: false
        //   };
        // });
        // setNodes(newNodes);
        // dispatch(setViewContainer(CONTAINER_VIEWS.inventoryDetail));
        // dispatch(selectInventory(node.id));
        // dispatch(selectPage(parentId));
        // dispatch(selectContainer(containerId));
        const tagLink = TAG_FROM_SOURCE[source];
        navigate(`/container/${containerId}/${tagLink}/${id}`);
        return;
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

        const tagLink = TAG_FROM_SOURCE[source];

        navigate(`/container/${containerId}/${tagLink}/${id}`);
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
      pageLimit={PAGE_LIMIT}
      theme={{
        ...minimalTheme,
        bodyTextStyle: {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          marginBottom: 0
        }
      }}
      paginated
      Checkbox={() => null}
      selectCallback={handleSelect}
      toggleCallback={handleToggle}
      handleLoadMoreInRoot={handleLoadMoreInRoot}
      isLast={isLast}
    />
  );
}
