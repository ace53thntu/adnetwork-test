//---> Build-in Modules
import * as React from 'react';

//---> External Modules
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import {useQueryClient} from 'react-query';

//---> Internal Modules
import {Tree, minimalTheme} from 'components/common/TreeLazy';
import {
  expandAdvertiserRedux,
  expandCampaignRedux,
  resetCampaignRedux,
  setAdvertisersRedux,
  setCampaignRedux,
  setStrategyRedux,
  useCampaignSelector
} from 'store/reducers/campaign';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL} from 'constants/misc';
import {useTreePagination} from 'hooks';
import {CampaignTreeStyled} from './styled';
import {useGetAdvertisers} from 'queries/advertiser';
import {advertisersMapData} from '../dto';
import {CampaignAPIRequest} from 'api/campaign.api';
import {GET_CAMAPAIGNS} from 'queries/campaign/constants';
import {StrategyAPIRequest} from 'api/strategy.api';
import {GET_STRATEGIES} from 'queries/strategy/constants';
import {RoutePaths} from 'constants/route-paths';
import {getResponseData} from 'utils/helpers/misc.helpers';

function SidebarTree(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryCache = useQueryClient();
  const {handleLoadMoreInRoot} = useTreePagination();

  const {advertisers: advertisersRedux} = useCampaignSelector();

  const {data, isFetching} = useGetAdvertisers({
    params: {limit: 1000, page: 1},
    enabled: true
  });
  const advertisers = getResponseData(data, IS_RESPONSE_ALL);

  React.useEffect(() => {
    if (!isFetching) {
      const items = advertisersMapData(advertisers);

      dispatch(setAdvertisersRedux(items));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advertisers, isFetching]);

  React.useEffect(() => {
    return () => {
      dispatch(resetCampaignRedux());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadChildren = React.useCallback(
    async (node, pageLimit, currentPage) => {
      const {isAdvertiser, id, expanded, isCampaign} = node;
      if (isAdvertiser) {
        if (expanded) {
          //
        } else {
          let children = [];
          try {
            const res = await CampaignAPIRequest.getAllCampaign({
              params: {
                limit: DEFAULT_PAGINATION.perPage,
                page: currentPage,
                advertiser_uuid: id
              },
              options: {isResponseAll: IS_RESPONSE_ALL}
            });
            const data = getResponseData(res, IS_RESPONSE_ALL);
            if (data) {
              queryCache.setQueryData([GET_CAMAPAIGNS, id], data);
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
                limit: DEFAULT_PAGINATION.perPage,
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
        return;
      }
      if (isCampaign) {
        dispatch(setCampaignRedux(advertiserId, id));
        navigate(`/${RoutePaths.CAMPAIGN}/${id}?advertiser_id=${advertiserId}`);
      }
      if (isStrategy) {
        dispatch(setStrategyRedux(advertiserId, parentId, id));
        navigate(
          `/${RoutePaths.CAMPAIGN}/${parentId}/${RoutePaths.STRATEGY}/${id}?advertiser_id=${advertiserId}`
        );
      }
    },
    [dispatch, navigate]
  );

  return (
    <CampaignTreeStyled>
      <Tree
        paginated
        pageLimit={DEFAULT_PAGINATION.perPage}
        theme={minimalTheme}
        nodes={advertisersRedux}
        Checkbox={() => null}
        loadChildren={loadChildren}
        selectCallback={handleSelect}
        toggleCallback={handleToggle}
        handleLoadMoreInRoot={handleLoadMoreInRoot}
      />
    </CampaignTreeStyled>
  );
}

SidebarTree.propTypes = {};
SidebarTree.defaultProps = {};

export default SidebarTree;
