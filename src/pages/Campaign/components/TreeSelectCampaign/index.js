import React, { useEffect, useLayoutEffect, useState } from "react";
import { TreeSelect } from 'antd';
import { getAllCampaignTreeData } from "../../utils";
import { RoutePaths } from "../../../../constants/route-paths";
import {
  setAdvertiserRedux,
  setCampaignRedux, setCampaignTreeDataRedux,
  setSelectedTreeNodeRedux,
  setStrategyRedux, useCampaignSelector
} from "../../../../store/reducers/campaign";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import "./index.scss";

const TreeSelectCampaign = React.memo(() => {
  const { selectedTreeNodeCampaign, campaignTreeData } = useCampaignSelector();
  const [treeData, setTreeData] = useState([]);
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

  const loopNode = (searchValue, data) => {
    return data.map((item) => {
      const index = item.title?.toLowerCase().indexOf(searchValue.toLowerCase());
      const beforeStr = item.title?.substr(0, index);
      const afterStr = item.title?.substr(index + searchValue.length);
      const matchedItemValue = item.title?.substr(index, searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: "#545cd8", fontWeight: "bold" }}>{matchedItemValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return { ...item, title, tempTitle: item.title, children: loopNode(searchValue, item.children) };
      }
      return {
        ...item,
        title,
        tempTitle: item.title
      };
    });
  }

  const onChangeTreeSelect = (e) => {
    const filteredData = loopNode(e, campaignTreeData);
    setTreeData(filteredData);
  }

  useEffect(() => {
    if (campaignTreeData) {
      setTreeData(campaignTreeData);
    }
  }, [campaignTreeData])


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
      treeData={treeData}
      placeholder="Please select..."
      onSelect={onTreeNodeSelect}
      filterTreeNode={(inputValue, treeNode) => {
        const { tempTitle } = treeNode;
        return tempTitle && tempTitle.toLowerCase().includes(inputValue.toLowerCase())
      }}
      onSearch={onChangeTreeSelect}
      onChange={() => setTreeData(campaignTreeData)}
    />
  );
});

export default TreeSelectCampaign;
