import {useMemo} from 'react';
import {
  BIDDING_METHODS,
  KPIS,
  listEngine,
  listEngineFirstPrice
} from '../constants';

const convertStatusValue = status => {
  if (status) {
    return 'active';
  }

  return 'inactive';
};

const findObjectById = ({listArr, itemId}) => {
  if (!listArr) {
    return null;
  }

  return listArr.find(item => item?.value === itemId);
};

export const useGetDefaultStrategy = ({
  strategyData = null,
  listCampaign = []
}) => {
  return useMemo(() => {
    if (!strategyData) {
      return null;
    }

    //---> Group information
    const {
      id,
      name,
      campaign_id: campaignId,
      campaign_name,
      families: familyIds = [],
      skip_delay
    } = strategyData;

    // campaign selected.
    const campaign_id = findObjectById({
      listArr: listCampaign,
      itemId: campaignId
    });

    const family_ids = familyIds?.map(item => {
      return {...item, value: item?.id, label: item?.name};
    }, []);

    //---> Group status
    const {
      active = true,
      week_parts_gmt = true,
      only_unskippable = false,
      only_skippable = false
    } = strategyData;

    //---> Ads group
    const {
      accepted_layouts = '',
      accepted_adunits = '',
      view_rate_prediction = '',
      engine: engineSelected = '',
      engine_configuration = null,
      engine_first_price: engineFirstPrice = '',
      engine_configuration_first_price = null,
      domain_black_lists = [],
      domain_white_lists = [],
      positions = [],
      ip_range_lists = [],
      networks = [],
      deals = [],
      ads_restrictive = true,
      inefficient_restrictive = true,
      force_deal = true
    } = strategyData;

    // Get engine option selected
    const engine = findObjectById({
      listArr: listEngine,
      itemId: engineSelected
    });

    // Get engine first price option selected
    const engine_first_price = findObjectById({
      listArr: listEngineFirstPrice,
      itemId: engineFirstPrice
    });

    const domainBackList = domain_black_lists?.map(item => {
      return {...item, value: item?.id, label: item?.name};
    });

    const domainWhiteList = domain_white_lists?.map(item => {
      return {...item, value: item?.id, label: item?.name};
    });

    const positionList = positions?.map(item => {
      return {...item, value: item?.id, label: item?.name};
    });

    const ipRangeList = ip_range_lists?.map(item => {
      return {...item, value: item?.id, label: item?.name};
    });

    const networkList = networks?.map(item => {
      return {...item, value: item?.id, label: item?.name};
    });

    const dealList = deals?.map(item => {
      return {...item, value: item?.id, label: item?.name};
    });

    //---> Cost group
    const {
      cpi = '',
      cpc = '',
      cpcc = '',
      cpvc = '',
      cplpc = '',
      cplpv = '',
      compc = '',
      compv = '',
      media_cost = '',
      tracking_cost = ''
    } = strategyData;

    //---> Keyword group
    const {keywords_white_lists, keywords_black_lists} = strategyData;
    const keywordWhiteList = keywords_white_lists?.map(item => {
      return {...item, value: item?.id, label: item?.name};
    });
    const ketwordBlackList = keywords_black_lists?.map(item => {
      return {...item, value: item?.id, label: item?.name};
    });

    //---> Billing status group
    const {use_campaign_billing, ubiquity_exists} = strategyData;
    const {budget} = strategyData;
    const destructureBuget = {
      ...budget,
      smooth: budget?.smooth ? 'active' : 'inactive'
    };

    // Engine First Price
    const foundFirstPriceBiddingMethod = [...BIDDING_METHODS].find(
      item => item.value === engine_configuration_first_price?.bidding_method
    );
    const foundFirstPriceKpi = [...KPIS].find(
      item => item.value === engine_configuration_first_price?.kpi
    );
    const newConfigFirstPrice = {
      ...engine_configuration_first_price,
      bidding_method: foundFirstPriceBiddingMethod,
      kpi: foundFirstPriceKpi
    };

    // Engine
    const foundBiddingMethod = [...BIDDING_METHODS].find(
      item => item.value === engine_configuration?.bidding_method
    );
    const foundKpi = [...KPIS].find(
      item => item.value === engine_configuration?.kpi
    );
    const newEngineConfig = {
      ...engine_configuration_first_price,
      bidding_method: foundBiddingMethod,
      kpi: foundKpi
    };

    return {
      id,
      name,
      campaign_id,
      campaign_name,
      family_ids,
      skip_delay,
      // Status group
      active: convertStatusValue(active),
      week_parts_gmt: convertStatusValue(week_parts_gmt),
      only_unskippable: convertStatusValue(only_unskippable),
      only_skippable: convertStatusValue(only_skippable),
      // Ads group
      accepted_layouts,
      accepted_adunits,
      view_rate_prediction,
      engine,
      engine_configuration: newEngineConfig,
      engine_first_price,
      engine_configuration_first_price: newConfigFirstPrice,
      domain_black_list_ids: domainBackList,
      domain_white_list_ids: domainWhiteList,
      position_ids: positionList,
      ip_range_list_ids: ipRangeList,
      network_ids: networkList,
      deal_ids: dealList,
      ads_restrictive: convertStatusValue(ads_restrictive),
      inefficient_restrictive: convertStatusValue(inefficient_restrictive),
      force_deal: convertStatusValue(force_deal),
      // Cost group
      cpi,
      cpc,
      cpcc,
      cpvc,
      cplpc,
      cplpv,
      compc,
      compv,
      media_cost,
      tracking_cost,
      // keyword group
      keywords_white_list_ids: keywordWhiteList,
      keywords_black_list_ids: ketwordBlackList,
      // Billings status
      use_campaign_billing: convertStatusValue(use_campaign_billing),
      ubiquity_exists: convertStatusValue(ubiquity_exists),
      budget: destructureBuget,
      use_view_rate_prediction_if_support: false
    };
  }, [listCampaign, strategyData]);
};
