import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import {useParams} from 'react-router-dom';

import AiActivTreeSelect from '../../../../components/AiActivTreeSelect';
import {RoutePaths} from '../../../../constants/route-paths';
import {useQueryString} from '../../../../hooks';
import {
  setAdvertiserRedux,
  setCampaignRedux,
  setStrategyRedux
} from '../../../../store/reducers/campaign';
import {
  setSelectedTreeNodeRedux,
  setSelectTreeDataRedux,
  useCommonSelector
} from '../../../../store/reducers/common';
import {getAllCampaignTreeData} from '../../utils';

function TreeSelectCampaign() {
  const {selectedTreeNode, selectTreeData} = useCommonSelector();

  const {campaignId, strategyId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQueryString();

  let advertiserIdQuery = query.get('advertiser_id');

  useEffect(() => {
    getCampaignTree();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCampaignTree = async () => {
    const treeData = await getAllCampaignTreeData();

    if (strategyId) {
      dispatch(setSelectedTreeNodeRedux(strategyId));
    } else if (campaignId) {
      dispatch(setSelectedTreeNodeRedux(campaignId));
    } else if (advertiserIdQuery) {
      dispatch(setSelectedTreeNodeRedux(advertiserIdQuery));
    } else {
      dispatch(setSelectedTreeNodeRedux(''));
    }

    dispatch(setSelectTreeDataRedux(treeData));
  };

  const handleSelectedItem = React.useCallback((value, node) => {
    const {
      isAdvertiser,
      isCampaign,
      isStrategy,
      uuid,
      advertiser_uuid,
      campaign_uuid
    } = node || {};

    dispatch(setSelectedTreeNodeRedux(value));

    if (isAdvertiser) {
      dispatch(setAdvertiserRedux(uuid));
      navigate(`/${RoutePaths.CAMPAIGN}?mode=campaign&advertiser_id=${uuid}`);
    } else if (isCampaign) {
      dispatch(setCampaignRedux(advertiser_uuid, uuid));
      navigate(
        `/${RoutePaths.CAMPAIGN}/${uuid}?advertiser_id=${advertiser_uuid}`
      );
    } else if (isStrategy) {
      dispatch(setStrategyRedux(advertiser_uuid, campaign_uuid, uuid));
      navigate(
        `/${RoutePaths.CAMPAIGN}/${campaign_uuid}/${RoutePaths.STRATEGY}/${uuid}/${RoutePaths.EDIT}?advertiser_id=${advertiser_uuid}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClearCampaign = value => {
    if (!value) {
      dispatch(setSelectedTreeNodeRedux(''));
      navigate(`/${RoutePaths.CAMPAIGN}`);
    }
  };

  return (
    <div style={{paddingLeft: '15px'}} className="mb-3">
      <AiActivTreeSelect
        allowClear
        selectedItem={selectedTreeNode}
        treeData={selectTreeData}
        onSelectedItem={handleSelectedItem}
        onChange={handleClearCampaign}
      />
    </div>
  );
}
export default TreeSelectCampaign;
