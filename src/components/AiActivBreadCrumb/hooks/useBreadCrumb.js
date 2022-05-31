import {useMemo} from 'react';
import {useQueryString} from "../../../hooks";
import {useParams} from "react-router-dom";
import {useCommonSelector} from "../../../store/reducers/common";
import {flattenMyTree} from "../utils";

export const useBreadCrumb = () => {
  const { selectTreeData } = useCommonSelector();
  const query = useQueryString();
  const { campaignId, strategyId, advertiserId, conceptId } = useParams();
  let advertiserIdQuery = query.get('advertiser_id');

  return useMemo(() => {
    let paths = [];
    const flattenTree = selectTreeData ? flattenMyTree(selectTreeData) : [];
    if(flattenTree && flattenTree.length > 0){
      if(advertiserId){
        const adv = flattenTree.find(item => item.uuid === advertiserId);
        paths.push({
          uuid: advertiserId,
          name: adv?.name,
          url: `/creative/${advertiserId}`
        })
      }

      if(conceptId){
        const adv = flattenTree.find(item => item.uuid === conceptId);
        paths.push({
          uuid: conceptId,
          name: adv?.name,
          url: `/creative/${advertiserId}/${conceptId}`
        })
      }

      if(advertiserIdQuery) {
        const adv = flattenTree.find(item => item.uuid === advertiserIdQuery);
        paths.push({
          uuid: advertiserIdQuery,
          name: adv?.name,
          url: `/campaign?mode=campaign&advertiser_id=${advertiserIdQuery}`
        })
      }

      if (campaignId) {
        const campaign = flattenTree.find(item => item.uuid === campaignId);
        paths.push({
          uuid: campaignId,
          name: campaign?.name,
          url: `/campaign/${campaignId}?advertiser_id=${advertiserIdQuery}`
        })
      }

      if (strategyId) {
        const strategy = flattenTree.find(item => item.uuid === strategyId);
        paths.push({
          uuid: strategyId,
          name: strategy?.name,
          url: `/campaign/${campaignId}/strategy/${strategyId}?advertiser_id=${advertiserIdQuery}`
        })
      }
    }
    return paths;
  }, [advertiserIdQuery, campaignId, strategyId, advertiserId, conceptId, selectTreeData]);
};
