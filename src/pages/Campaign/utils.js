import {CAMPAIGN_KEYS} from './constants';
import moment from 'moment';
import {AdvertiserAPIRequest} from "../../api/advertiser.api";
import {IS_RESPONSE_ALL} from "../../constants/misc";
import {CampaignAPIRequest} from "../../api/campaign.api";
import _ from "lodash";

const DEFAULT_PAGE = 1;
const TOTAL_ITEMS = 1000;

export const parseCampaignFormData = formData => {
  const {
    advertiser,
    name,
    status,
    start_time,
    end_time,
    check_visit,
    auto_realloc
  } = formData;

  const formatStartDate = `${moment(start_time).format('DD-MM-YYYY')} 00:00:00`;
  const formaEndDate = `${moment(end_time).format('DD-MM-YYYY')} 23:59:59`;

  return {
    [CAMPAIGN_KEYS.ADVERTISER_ID]: advertiser?.value || undefined,
    [CAMPAIGN_KEYS.NAME]: name,
    [CAMPAIGN_KEYS.STATUS]: status,
    [CAMPAIGN_KEYS.START_TIME]: formatStartDate,
    [CAMPAIGN_KEYS.END_TIME]: formaEndDate,
    [CAMPAIGN_KEYS.CHECK_VISIT]: check_visit === 'active' ? true : false,
    [CAMPAIGN_KEYS.AUTO_REALLOC]: auto_realloc === 'active' ? true : false
  };
};

export const getAllCampaignTreeData = async () => {
  let advertiserDataMap;
  const params = {
    page: DEFAULT_PAGE,
    per_page: TOTAL_ITEMS,
    sort: 'created_at DESC',
    status: 'active'
  };
  const response = await AdvertiserAPIRequest.getAllAdvertiser({
    params,
    options: {
      isResponseAll: IS_RESPONSE_ALL
    }
  });

  const { data: advertiserData } = response?.data || {};
  if(advertiserData){
    let promises = [];
    advertiserData.forEach(item => {
      const { uuid: advertiserUUID } = item || {};
      promises.push(CampaignAPIRequest.getAllCampaign({
        params: {
          advertiser_uuid: advertiserUUID,
          page: DEFAULT_PAGE,
          per_page: TOTAL_ITEMS
        },
        options: {isResponseAll: IS_RESPONSE_ALL}
      }));
    })

    const promiseAll = await Promise.all(promises);
    let allCampaigns = promiseAll.reduce((a, b) => a.concat(b?.data?.data), []);
    allCampaigns = allCampaigns.map(
      campaign => {
        const { name: campaignName, uuid: campaignUUID } = campaign || {};
        return {
          ...campaign, title: campaignName, value: campaignUUID, isCampaign: true,
          children: campaign?.strategies ? campaign.strategies.map(s => {
              const { name: strategyName, uuid: strategyUUID } = s || {};
              return { ...s, title: strategyName, value: strategyUUID, isStrategy: true};
            }
          ) : []
        }
      }
    )

    advertiserDataMap = advertiserData.map(adv => {
      const { name: advName, uuid: advUUID } = adv || {};
      const children = allCampaigns.filter(campaign => campaign.advertiser_uuid === advUUID);
      return { ...adv, title: advName, value: advUUID, isAdvertiser: true, children };
    })

  }
  return advertiserDataMap;
}
