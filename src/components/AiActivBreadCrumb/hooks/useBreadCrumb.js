import {useMemo} from 'react';
import {useQueryString} from "../../../hooks";
import {useParams} from "react-router-dom";
import {useCommonSelector} from "../../../store/reducers/common";
import {flattenMyTree} from "../utils";
import {RoutePaths} from "../../../constants/route-paths";
import {SOURCE_HEADINGS} from "../../../pages/Container/components/ContainerSourcePage/constants";

export const useBreadCrumb = () => {
  const { selectTreeData } = useCommonSelector();
  const query = useQueryString();
  const { campaignId, strategyId, advertiserId, conceptId, cid: containerId, source, pageId } = useParams();
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
          url: `/${RoutePaths.CREATIVE}/${advertiserId}`
        })
      }

      if(conceptId){
        const adv = flattenTree.find(item => item.uuid === conceptId);
        paths.push({
          uuid: conceptId,
          name: adv?.name,
          url: `/${RoutePaths.CREATIVE}/${advertiserId}/${conceptId}`
        })
      }

      if(advertiserIdQuery) {
        const adv = flattenTree.find(item => item.uuid === advertiserIdQuery);
        paths.push({
          uuid: advertiserIdQuery,
          name: adv?.name,
          url: `/${RoutePaths.CAMPAIGN}?mode=campaign&advertiser_id=${advertiserIdQuery}`
        })
      }

      if (campaignId) {
        const campaign = flattenTree.find(item => item.uuid === campaignId);
        paths.push({
          uuid: campaignId,
          name: campaign?.name,
          url: `/${RoutePaths.CAMPAIGN}/${campaignId}?advertiser_id=${advertiserIdQuery}`
        })
      }

      if (strategyId) {
        const strategy = flattenTree.find(item => item.uuid === strategyId);
        paths.push({
          uuid: strategyId,
          name: strategy?.name,
          url: `/${RoutePaths.CAMPAIGN}/${campaignId}/strategy/${strategyId}?advertiser_id=${advertiserIdQuery}`
        })
      }

      if (containerId) {
        const container = flattenTree.find(item => item.uuid === containerId);
        paths.push({
          uuid: containerId,
          name: container?.name,
          url: `/${RoutePaths.CONTAINER}/${containerId}`
        })
      }

      if (pageId) {
        const page = flattenTree.find(item => item.uuid === pageId);
        paths.push({
          uuid: pageId,
          name: page?.name,
          url: `/${RoutePaths.CONTAINER}/${containerId}/${source}/${pageId}`
        })
      }
    }
    return paths;
  }, [advertiserIdQuery, campaignId, strategyId, advertiserId, conceptId, containerId, source, pageId, selectTreeData]);
};
