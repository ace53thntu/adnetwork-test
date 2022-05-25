import {useMemo} from 'react';
import {useQueryString} from "../../../hooks";
import {useParams} from "react-router-dom";
import {useCampaignSelector} from "../../../store/reducers/campaign";
import {flattenMyTree} from "../utils";

export const useBreadCrumb = () => {
  const { campaignTreeData } = useCampaignSelector();
  const query = useQueryString();
  const { campaignId, strategyId } = useParams();
  let advertiserId = query.get('advertiser_id');

  return useMemo(() => {
    let paths = [];
    const flattenTree = campaignTreeData ? flattenMyTree(campaignTreeData) : [];
    if(flattenTree && flattenTree.length > 0){
      if(advertiserId) {
        const adv = flattenTree.find(item => item.uuid === advertiserId);
        paths.push({
          uuid: advertiserId,
          name: adv?.name,
          url: `/campaign?mode=campaign&advertiser_id=${advertiserId}`
        })
      }

      if (campaignId) {
        const campaign = flattenTree.find(item => item.uuid === campaignId);
        paths.push({
          uuid: campaignId,
          name: campaign?.name,
          url: `/campaign/${campaignId}?advertiser_id=${advertiserId}`
        })
      }

      if (strategyId) {
        const strategy = flattenTree.find(item => item.uuid === strategyId);
        paths.push({
          uuid: strategyId,
          name: strategy?.name,
          url: `/campaign/${campaignId}/strategy/${strategyId}?advertiser_id=${advertiserId}`
        })
      }
    }
    return paths;
  }, [campaignId, strategyId, advertiserId, campaignTreeData]);
};
