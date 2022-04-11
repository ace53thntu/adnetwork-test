import {AdvertiserAPIRequest} from 'api/advertiser.api';
import {CampaignAPIRequest} from 'api/campaign.api';
import {StrategyAPIRequest} from 'api/strategy.api';
//---> Internal Modules
import {Tree, minimalTheme} from 'components/common/TreeLazy';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {RoutePaths} from 'constants/route-paths';
import useDeepCompareEffect from 'hooks/useDeepCompareEffect';
import {GET_STRATEGIES} from 'queries/strategy/constants';
//---> Build-in Modules
import * as React from 'react';
import {useQueryClient} from 'react-query';
//---> External Modules
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import {
  expandAdvertiserRedux,
  expandCampaignRedux,
  loadCampaignRedux,
  resetCampaignRedux,
  setAdvertiserRedux,
  setAdvertisersRedux,
  setCampaignRedux,
  setStrategyRedux,
  useCampaignSelector
} from 'store/reducers/campaign';
import {
  getResponseData,
  getResponsePagination,
  isValidResponse
} from 'utils/helpers/misc.helpers';

import {advertisersMapData} from '../dto';
import {CampaignTreeStyled} from './styled';

function SidebarTree(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryCache = useQueryClient();

  const {
    advertisers: advertisersRedux,
    selectedAdvertiserId,
    selectedCampaignId,
    advertiserPage,
    advertiserTotalPage,
    keyword
  } = useCampaignSelector();

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
    const res = await AdvertiserAPIRequest.getAllAdvertiser({
      params,
      options: {
        isResponseAll: IS_RESPONSE_ALL
      }
    });

    if (isValidResponse(res, IS_RESPONSE_ALL)) {
      const items = advertisersMapData(
        getResponseData(res, IS_RESPONSE_ALL),
        currentPage
      );
      // setTotal(getResponsePagination(res).totalItems);
      dispatch(
        setAdvertisersRedux(
          items,
          currentPage,
          getResponsePagination(res).totalItems
        )
      );
    }
  }

  React.useEffect(() => {
    init(1, keyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  useDeepCompareEffect(() => {
    if (selectedCampaignId) {
      async function initCampaign() {
        const res = await getCampaigns(selectedAdvertiserId);

        if (res?.data?.length) {
          dispatch(loadCampaignRedux(res?.data));
        } else {
          dispatch(loadCampaignRedux([]));
        }
      }

      const isExpanded = advertisersRedux?.find(
        item => item.id === selectedAdvertiserId
      )?.children?.length;
      if (!isExpanded) {
        initCampaign();
      }
    }
  }, [selectedAdvertiserId, advertisersRedux, dispatch]);

  React.useEffect(() => {
    return () => {
      dispatch(resetCampaignRedux());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCampaigns = advId => {
    try {
      return CampaignAPIRequest.getAllCampaign({
        params: {
          advertiser_uuid: advId
        }
      });
    } catch (error) {
      return [];
    }
  };

  const loadChildren = React.useCallback(
    async (node, pageLimit, currentPage, state) => {
      const {isAdvertiser, id, isCampaign, expanded} = node;

      if (isAdvertiser) {
        if (state.expanded) {
          // Campaign pagination
          let children = [];
          let campaignTotal = 0;
          let totalItems = 0;
          try {
            const res = await CampaignAPIRequest.getAllCampaign({
              params: {
                per_page: DEFAULT_PAGINATION.perPage,
                page: currentPage,
                advertiser_uuid: id
              },
              options: {isResponseAll: IS_RESPONSE_ALL}
            });
            const data = getResponseData(res, IS_RESPONSE_ALL);
            totalItems = getResponsePagination(res)?.totalItems || 0;
            campaignTotal = Math.ceil(totalItems / pageLimit);
            if (data) {
              const currentSourceData = data ?? [];
              currentSourceData.forEach((item, index) => {
                children.push({
                  id: item.uuid,
                  name: item.name,
                  children: [],
                  numChildren: item?.total_strategies || 0,
                  page: 0,
                  totalPage: campaignTotal,
                  expanded: false,
                  selected: false,
                  parentId: id,
                  isCampaign: true,
                  advertiserId: id
                });
              });
            }
          } catch (error) {
            //
          }

          return children;
        } else {
          let children = [];
          try {
            const res = await CampaignAPIRequest.getAllCampaign({
              params: {
                per_page: DEFAULT_PAGINATION.perPage,
                page: currentPage,
                advertiser_uuid: id
              },
              options: {isResponseAll: IS_RESPONSE_ALL}
            });
            const data = getResponseData(res, IS_RESPONSE_ALL);

            if (data) {
              const currentSourceData = data ?? [];
              currentSourceData.forEach((item, index) => {
                children.push({
                  id: item.uuid,
                  name: item.name,
                  children: [],
                  numChildren: item?.total_strategies || 0,
                  page: 0,
                  expanded: false,
                  selected: false,
                  parentId: id,
                  isCampaign: true,
                  advertiserId: id
                });
              });
            }
          } catch (error) {
            //
          }
          return children;
        }
      }

      if (isCampaign) {
        if (!expanded) {
          const {parentId, id: campaignId} = node;
          let children = [];
          try {
            const res = await StrategyAPIRequest.getAllStrategy({
              params: {
                per_page: DEFAULT_PAGINATION.perPage,
                // per_page: 1,
                page: currentPage,
                campaign_uuid: campaignId
              },
              options: {isResponseAll: IS_RESPONSE_ALL}
            });
            const data = getResponseData(res, IS_RESPONSE_ALL);
            if (data) {
              queryCache.setQueryData([GET_STRATEGIES, campaignId], data);
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
                  parentId: campaignId,
                  isStrategy: true,
                  campaignId: campaignId,
                  advertiserId: parentId
                });
              });
            }
          } catch (error) {
            //
          }
          return children;
        } else {
          const {parentId, id: campaignId} = node;
          let children = [];
          try {
            const res = await StrategyAPIRequest.getAllStrategy({
              params: {
                per_page: DEFAULT_PAGINATION.perPage,
                // per_page: 1,
                page: currentPage,
                campaign_uuid: campaignId
              },
              options: {isResponseAll: IS_RESPONSE_ALL}
            });
            const data = getResponseData(res, IS_RESPONSE_ALL);
            if (data) {
              queryCache.setQueryData([GET_STRATEGIES, campaignId], data);
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
                  parentId: campaignId,
                  isStrategy: true,
                  campaignId: campaignId,
                  advertiserId: parentId
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
    const {isAdvertiser, parentId, id, isCampaign} = node;
    if (isAdvertiser) {
      dispatch(expandAdvertiserRedux(id, state));
    }
    if (isCampaign) {
      dispatch(expandCampaignRedux(id, state, parentId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = React.useCallback(
    (event, node, state) => {
      const {
        isAdvertiser,
        parentId,
        id,
        isCampaign,
        isStrategy,
        advertiserId
      } = node;
      if (isAdvertiser) {
        navigate(`/${RoutePaths.CAMPAIGN}?mode=campaign&advertiser_id=${id}`);
        dispatch(setAdvertiserRedux(id));

        return;
      }
      if (isCampaign) {
        dispatch(setCampaignRedux(advertiserId, id));
        navigate(`/${RoutePaths.CAMPAIGN}/${id}?advertiser_id=${advertiserId}`);
        return;
      }
      if (isStrategy) {
        dispatch(setStrategyRedux(advertiserId, parentId, id));
        navigate(
          `/${RoutePaths.CAMPAIGN}/${parentId}/${RoutePaths.STRATEGY}/${id}?advertiser_id=${advertiserId}`
        );
        return;
      }
    },
    [dispatch, navigate]
  );

  const totalPage = Math.ceil(advertiserTotalPage / DEFAULT_PAGINATION.perPage);

  const handleLoadMoreInRoot = React.useCallback(() => {
    if (totalPage > advertiserPage) {
      // setPage(page + 1);
      init(advertiserPage + 1, keyword);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advertiserPage, totalPage, keyword]);

  return (
    <CampaignTreeStyled>
      <Tree
        paginated
        pageLimit={DEFAULT_PAGINATION.perPage}
        theme={minimalTheme}
        nodes={JSON.parse(JSON.stringify(advertisersRedux))}
        Checkbox={() => null}
        loadChildren={loadChildren}
        selectCallback={handleSelect}
        toggleCallback={handleToggle}
        handleLoadMoreInRoot={handleLoadMoreInRoot}
        isLast={advertiserPage === totalPage}
      />
    </CampaignTreeStyled>
  );
}

SidebarTree.propTypes = {};
SidebarTree.defaultProps = {};

export default SidebarTree;
