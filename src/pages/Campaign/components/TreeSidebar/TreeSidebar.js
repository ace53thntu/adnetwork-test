//---> Build-in Modules
import React, {useCallback, useEffect, useState} from 'react';

//---> External Modules
import {useDispatch, useSelector} from 'react-redux';

//---> Internal Modules
import {Tree, minimalTheme} from 'components/layouts/Admin/components/TreeLazy';
import {
  reloadTree,
  selectAdvertiser,
  selectCampaign,
  selectStrategy,
  setViewCampaign
} from 'store/reducers/campaign';
import useDeepCompareEffect, {
  useDeepCompareMemoize
} from 'hooks/useDeepCompareEffect';
import {makeStyles} from '@material-ui/core/styles';
import {CAMPAIGN_VIEWS} from 'pages/Campaign/constants';
import {unSelectedChild} from 'utils/helpers/tree.helpers';
import {AdvertiserAPIRequest} from 'api/advertiser.api';
import {useCancelRequest} from 'hooks';
import {StrategyAPIRequest} from 'api/strategy.api';
import {CampaignAPIRequest} from 'api/campaign.api';

const TreeListView = ({
  data = [],
  loadChildren,
  selectedAdvertiser,
  view,
  handleLoadMoreInRoot,
  isLast = false
}) => {
  const dispatch = useDispatch();
  const [nodes, setNodes] = useState(data);

  useDeepCompareEffect(() => {
    if (selectedAdvertiser) {
      const newNodes = [...nodes].map(item => ({
        ...item,
        selected:
          view === CAMPAIGN_VIEWS.advertiserDetail
            ? item.id === selectedAdvertiser
            : false
      }));
      setNodes(newNodes);
    }
  }, [nodes, selectedAdvertiser, view]);

  useDeepCompareEffect(() => {
    setNodes(data);
  }, [data]);

  const handleSelect = useCallback(
    (event, node, state) => {
      const {
        isAdvertiser,
        isCampaign,
        isStrategy,
        parentId,
        advertiserId
      } = node;
      if (isAdvertiser) {
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
        dispatch(setViewCampaign(CAMPAIGN_VIEWS.advertiserDetail));
        dispatch(selectAdvertiser(node.id));
        dispatch(selectCampaign(null));
        dispatch(selectStrategy(null));
      }
      if (isCampaign) {
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
        dispatch(setViewCampaign(CAMPAIGN_VIEWS.campaignDetail));
        dispatch(selectCampaign(node.id));
        dispatch(selectAdvertiser(advertiserId));
        dispatch(selectStrategy(null));
      }
      if (isStrategy) {
        const newNodes = [...nodes].map(item => {
          if (item.id === advertiserId) {
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
        dispatch(setViewCampaign(CAMPAIGN_VIEWS.strategyDetail));
        dispatch(selectStrategy(node.id));
        dispatch(selectCampaign(parentId));
        dispatch(selectAdvertiser(advertiserId));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [useDeepCompareMemoize(nodes)]
  );

  const handleToggle = useCallback(
    (event, node, state) => {
      const {isAdvertiser, isCampaign, parentId} = node;

      if (isAdvertiser) {
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
      if (isCampaign) {
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
};

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

function TreeSiebar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {cancelToken} = useCancelRequest();
  const {shouldReloadTree, selectedAdvertiser, view} = useSelector(
    state => state.campReducer
  );
  const [treeData, setTreeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  const getAdvertiserData = useCallback(
    async (page, perPage, name, agencyId) => {
      return AdvertiserAPIRequest.getAllAdvertiser({
        params: {
          page,
          limit: perPage,
          agency_uuid: agencyId
        },
        options: {
          cancelToken
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cancelToken]
  );

  const getStrategyData = useCallback(
    async ({page, perPage, name, campaignId}) => {
      return StrategyAPIRequest.getAllStrategy({
        params: {
          page,
          limit: perPage,
          campaign_uuid: campaignId
        },
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
      const {data, headers} = await getAdvertiserData(currentPage, 10, '');
      const resData = data?.items ?? [];
      const newData = resData.map(({uuid: id, name, total_campaigns = 0}) => ({
        id,
        name,
        description: '',
        children: [],
        page: 0,
        numChildren: total_campaigns,
        expanded: false,
        selected: false,
        isAdvertiser: true
      }));

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
        const {data} = await getAdvertiserData(1, 10, '');
        const resData = data?.data ?? [];
        const newData = resData.map(({uuid, name, total_campaigns = 0}) => ({
          id: uuid,
          name,
          description: '',
          children: [],
          page: 0,
          numChildren: total_campaigns,
          expanded: false,
          selected: false,
          isAdvertiser: true
        }));

        setTreeData(newData);
        dispatch(reloadTree(false));
      }
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldReloadTree]);

  const loadChildren = useCallback(async (node, pageLimit, currentPage) => {
    if (node.isAdvertiser) {
      try {
        const {data} = await CampaignAPIRequest.getAllCampaign({
          params: {
            page: currentPage,
            limit: pageLimit,
            name: '',
            advertiser_uuid: node.id
          },
          options: {
            cancelToken
          }
        });

        const resData = data?.items ?? [];

        const children = resData.map(
          ({uuid: id, name, total_strategies = 0}) => ({
            id,
            name: name,
            description: '',
            children: [],
            numChildren: total_strategies,
            page: 0,
            expanded: false,
            selected: false,
            isCampaign: true,
            parentId: node.id
          })
        );

        return children;
      } catch (error) {}
    } else {
      try {
        const {data} = await getStrategyData({
          campaignId: node.id,
          page: currentPage,
          perPage: pageLimit
        });

        const resData = data?.items ?? [];

        const children = resData.map(({uuid: id, name}) => ({
          id,
          name: name,
          description: '',
          children: [],
          numChildren: 0,
          page: 0,
          expanded: false,
          selected: false,
          isStrategy: true,
          parentId: node.id,
          advertiserId: node.parentId
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
          selectedAdvertiser={selectedAdvertiser}
          view={view}
          handleLoadMoreInRoot={handleLoadMoreInRoot}
          isLast={currentPage === lastPage}
        />
      )}
    </div>
  );
}

export default TreeSiebar;
