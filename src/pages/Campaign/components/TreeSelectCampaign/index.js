import * as React from 'react';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import AiActivTreeSelect from "../../../../components/AiActivTreeSelect";
import {RoutePaths} from "../../../../constants/route-paths";
import {setAdvertiserRedux, setCampaignRedux, setStrategyRedux} from "../../../../store/reducers/campaign";
import {setSelectedTreeNodeRedux, useCommonSelector} from "../../../../store/reducers/common";
import {getAllCampaignTreeData} from "../../utils";
import {useParams} from "react-router-dom";
import {useQueryString} from "../../../../hooks";

function TreeSelectCampaign() {
  const { selectedTreeNode } = useCommonSelector();
  const [treeData, setTreeData] = useState();
  const { campaignId, strategyId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQueryString();

  let advertiserIdQuery = query.get('advertiser_id');

  useEffect(() => {
    getCampaignTree();
  }, [])

  const getCampaignTree = async () => {
    const treeData = await getAllCampaignTreeData();

    if(strategyId){
      dispatch(setSelectedTreeNodeRedux(strategyId))
    } else if(campaignId) {
      dispatch(setSelectedTreeNodeRedux(campaignId))
    } else if(advertiserIdQuery) {
      dispatch(setSelectedTreeNodeRedux(advertiserIdQuery))
    } else {
      dispatch(setSelectedTreeNodeRedux(''))
    }

    setTreeData(treeData);
  }

  const handleSelectedItem = React.useCallback((value, node) => {
    const { isAdvertiser, isCampaign, isStrategy, uuid, advertiser_uuid, campaign_uuid } = node || {};

    dispatch(setSelectedTreeNodeRedux(value));

    if (isAdvertiser) {
      dispatch(setAdvertiserRedux(uuid));
      navigate(`/${RoutePaths.CAMPAIGN}?mode=campaign&advertiser_id=${uuid}`);
    }
    else if (isCampaign) {
      dispatch(setCampaignRedux(advertiser_uuid, uuid));
      navigate(`/${RoutePaths.CAMPAIGN}/${uuid}?advertiser_id=${advertiser_uuid}`);
    }
    else if (isStrategy) {
      dispatch(setStrategyRedux(advertiser_uuid, campaign_uuid, uuid));
      navigate(
        `/${RoutePaths.CAMPAIGN}/${campaign_uuid}/${RoutePaths.STRATEGY}/${uuid}?advertiser_id=${advertiser_uuid}`
      );
    }
  }, []);

  const handleClearCampaign = (value) => {
   if(!value){
     dispatch(setSelectedTreeNodeRedux(''))
     navigate(`/${RoutePaths.CAMPAIGN}`);
   }
  }

  return (
    <div style={{paddingLeft: "15px" }} className="mb-3">
      <AiActivTreeSelect
        allowClear
        selectedItem={selectedTreeNode}
        treeData={treeData}
        onSelectedItem={handleSelectedItem}
        onChange={handleClearCampaign}
      />
    </div>
  );
}
export default TreeSelectCampaign;