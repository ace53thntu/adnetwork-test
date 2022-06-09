import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { RoutePaths } from '../../../constants/route-paths';
import { useQueryString } from '../../../hooks';
import { SOURCE_HEADINGS } from '../../../pages/Container/components/ContainerSourcePage/constants';
import { useDispatchSelectContainer } from '../../../pages/Container/hooks/useDispatchSelectContainer';
import { useCommonSelector } from '../../../store/reducers/common';
import { flattenMyTree } from '../utils';

export const useBreadCrumb = () => {
  const { t } = useTranslation();
  const { selectTreeData } = useCommonSelector();
  const query = useQueryString();
  const { pathname, search } = useLocation();
  const {
    campaignId,
    strategyId,
    advertiserId,
    conceptId,
    cid: containerId,
    source,
    pageId
  } = useParams();
  const { container } = useDispatchSelectContainer();
  let advertiserIdQuery = query.get('advertiser_id');

  return useMemo(() => {
    let paths = [];
    const flattenTree = selectTreeData ? flattenMyTree(selectTreeData) : [];
    if (flattenTree && flattenTree.length > 0) {
      if (advertiserId) {
        const adv = flattenTree.find(item => item.uuid === advertiserId);
        paths.push({
          uuid: advertiserId,
          name: adv?.name,
          url: `/${RoutePaths.CREATIVE}/${advertiserId}`
        });
      }

      if (conceptId) {
        const adv = flattenTree.find(item => item.uuid === conceptId);
        paths.push({
          uuid: conceptId,
          name: adv?.name,
          url: `/${RoutePaths.CREATIVE}/${advertiserId}/${conceptId}`
        });
      }

      if (advertiserIdQuery) {
        const adv = flattenTree.find(item => item.uuid === advertiserIdQuery);
        paths.push({
          uuid: advertiserIdQuery,
          name: adv?.name,
          url: `/${RoutePaths.CAMPAIGN}?mode=campaign&advertiser_id=${advertiserIdQuery}`
        });
        if (pathname === '/campaign/create') {
          paths.push({
            name: t('createCampaign'),
            url: `/${pathname}${search}`
          });
        }
      }

      if (campaignId) {
        const campaign = flattenTree.find(item => item.uuid === campaignId);
        paths.push({
          uuid: campaignId,
          name: campaign?.name,
          url: `/${RoutePaths.CAMPAIGN}/${campaignId}?advertiser_id=${advertiserIdQuery}`
        });
      }

      if (strategyId) {
        const strategy = flattenTree.find(item => item.uuid === strategyId);
        paths.push({
          uuid: strategyId,
          name: strategy?.name,
          url: `/${RoutePaths.CAMPAIGN}/${campaignId}/strategy/${strategyId}?advertiser_id=${advertiserIdQuery}`
        });
      }

      if (containerId) {
        const container = flattenTree.find(item => item.uuid === containerId);
        paths.push({
          uuid: containerId,
          name: container?.name,
          url: `/${RoutePaths.CONTAINER}/${containerId}`
        });
      }

      if (source && container) {
        const sourcePages = container?.pages?.filter(
          page => page.source === source
        );
        const { container_uuid, uuid } = sourcePages[0] || {};
        const firstSourcePageUrl = `/${RoutePaths.CONTAINER}/${container_uuid}/${source}/${uuid}`;

        paths.push({
          uuid: uuid,
          name: SOURCE_HEADINGS[source],
          url: firstSourcePageUrl
        });
      }

      if (pageId) {
        const page = flattenTree.find(item => item.uuid === pageId);
        paths.push({
          uuid: pageId,
          name: page?.name,
          url: `/${RoutePaths.CONTAINER}/${containerId}/${source}/${pageId}`
        });
      }
    }
    if ((pathname === '/campaign/create' && paths.length === 0)) {
      paths = [{
        name: t('campaignManagement'),
        url: `/${RoutePaths.CAMPAIGN}`
      }, ...paths, {
        name: t('createCampaign'),
        url: ''
      }];
    }
    return paths;
  }, [
    advertiserIdQuery,
    campaignId,
    strategyId,
    advertiserId,
    conceptId,
    containerId,
    source,
    pageId,
    selectTreeData,
    container,
    pathname,
    search,
    t
  ]);
};
