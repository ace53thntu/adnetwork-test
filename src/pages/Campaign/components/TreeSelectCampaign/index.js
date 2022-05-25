import React, {useLayoutEffect, useState} from "react";
import { TreeSelect } from 'antd';
import { getAllCampaignTreeData } from "../../utils";
import {RoutePaths} from "../../../../constants/route-paths";
import {
  setAdvertiserRedux,
  setCampaignRedux, setCampaignTreeDataRedux,
  setSelectedTreeNodeRedux,
  setStrategyRedux, useCampaignSelector
} from "../../../../store/reducers/campaign";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import "./index.scss";

const TreeSelectCampaign = React.memo(() => {
  const { selectedTreeNodeCampaign, campaignTreeData } = useCampaignSelector();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    getCampaignTree();
  }, [])

  const getCampaignTree = async () => {
    const allCampaignTreeData = await getAllCampaignTreeData();
    dispatch(setCampaignTreeDataRedux(allCampaignTreeData));
  }

  const onTreeNodeSelect = (value, node) => {
    const { isAdvertiser, isCampaign, isStrategy, uuid, advertiser_uuid, campaign_uuid } = node || {};

    //set selected tree node
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
  };

  return (
    <TreeSelect
      treeLine
      showSearch
      className="mr-3"
      style={{
        width: '350px',
      }}
      value={campaignTreeData ? selectedTreeNodeCampaign : null}
      dropdownStyle={{
        maxHeight: 400,
        overflow: 'auto',
      }}
      treeData={campaignTreeData}
      placeholder="Please select..."
      onSelect={onTreeNodeSelect}
      filterTreeNode={(inputValue, treeNode) => {
        return treeNode.title.toLowerCase().includes(inputValue.toLowerCase())
      }}
    />
  );
});

export default TreeSelectCampaign;
