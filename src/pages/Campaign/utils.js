import moment from 'moment';

import {AdvertiserAPIRequest} from '../../api/advertiser.api';
import {CampaignAPIRequest} from '../../api/campaign.api';
import {IS_RESPONSE_ALL} from '../../constants/misc';
import {CAMPAIGN_KEYS} from './constants';
import {utils, writeFile} from 'xlsx';
import {useGenerateReportUrl} from 'queries/report';
import React from 'react';
import {DEFAULT_TIME_UNIT, EntityTypes, ReportTypes} from 'constants/report';
import {TimezoneMappingHai} from 'utils/helpers/getListTimezone';
import {convertLocalDateToTimezone} from 'utils/helpers/dateTime.helpers';
import __uniq from 'lodash/uniq';
import {capitalize} from 'utils/helpers/string.helpers';
import {ShowToast} from 'utils/helpers/showToast.helpers';
// import __sortBy from 'lodash/sortBy'

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

  const {data: advertiserData} = response?.data || {};
  if (advertiserData) {
    let promises = [];
    advertiserData.forEach(item => {
      const {uuid: advertiserUUID} = item || {};
      promises.push(
        CampaignAPIRequest.getAllCampaign({
          params: {
            advertiser_uuid: advertiserUUID,
            page: DEFAULT_PAGE,
            per_page: TOTAL_ITEMS
          },
          options: {isResponseAll: IS_RESPONSE_ALL}
        })
      );
    });

    const promiseAll = await Promise.all(promises);
    let allCampaigns = promiseAll.reduce((a, b) => a.concat(b?.data?.data), []);
    allCampaigns = allCampaigns.map(campaign => {
      const {name: campaignName, uuid: campaignUUID} = campaign || {};
      return {
        ...campaign,
        title: campaignName,
        value: campaignUUID,
        isCampaign: true,
        children: campaign?.strategies
          ? campaign.strategies.map(s => {
              const {name: strategyName, uuid: strategyUUID} = s || {};
              return {
                ...s,
                title: strategyName,
                value: strategyUUID,
                isStrategy: true
              };
            })
          : []
      };
    });

    advertiserDataMap = advertiserData.map(adv => {
      const {name: advName, uuid: advUUID} = adv || {};
      const children = allCampaigns.filter(
        campaign => campaign.advertiser_uuid === advUUID
      );
      return {
        ...adv,
        title: advName,
        value: advUUID,
        isAdvertiser: true,
        children
      };
    });
  }
  return advertiserDataMap;
};

function filterTree(array, uuid) {
  const getNodes = (result, object) => {
    if (
      (!Array.isArray(object.children) || object.children?.length === 0) &&
      object.uuid !== uuid
    ) {
      result.push(object);
      return result;
    }
    if (Array.isArray(object.children) && object.uuid !== uuid) {
      const children = object.children.reduce(getNodes, []);
      result.push({...object, children});
    }
    return result;
  };
  return array.reduce(getNodes, []);
}

export const updateTreeData = ({
  treeData,
  advertiserId,
  campaignId = undefined,
  strategyId = undefined,
  uuid
}) => {
  let tmpTree = [...treeData];
  tmpTree = filterTree(tmpTree, uuid);
  return JSON.parse(JSON.stringify(tmpTree));
};

export const hasGeneralFilterInput = strategy => {
  if (strategy) {
    const {positions, sources, location, cpm_max} = strategy || {};
    const hasPosition = positions && positions.length > 0;
    const hasSources = sources && sources.length > 0;
    const hasLocation = location && location.length > 0;
    const hasCPMMax = cpm_max && cpm_max > 0;
    return hasPosition || hasSources || hasLocation || hasCPMMax;
  }
  return false;
};

export const hasVideoFilterInput = strategy => {
  if (strategy) {
    const {
      linearity,
      only_skipable,
      only_unskipable,
      protocols,
      ptype,
      skip_delay,
      start_delay
    } = strategy?.video_filter || {};
    return (
      linearity ||
      only_skipable ||
      only_unskipable ||
      protocols ||
      ptype ||
      skip_delay ||
      start_delay
    );
  }
  return false;
};

export const hasContextFilterInput = strategy => {
  if (strategy) {
    const {
      bandwidth,
      browser,
      browser_language,
      device_manufacturer,
      device_type,
      mobile_carrier,
      operating_system,
      platform
    } = strategy?.context_filter || {};
    return (
      bandwidth?.length > 0 ||
      browser?.length > 0 ||
      browser_language?.length > 0 ||
      device_manufacturer?.length > 0 ||
      device_type?.length > 0 ||
      mobile_carrier?.length > 0 ||
      platform?.length > 0 ||
      operating_system?.length > 0
    );
  }
  return false;
};

export const hasConcepts = strategy => {
  if (strategy) {
    const {concepts} = strategy || {};
    return concepts && concepts.length > 0;
  }
  return false;
};

export function useExportReportStrategy() {
  const {mutateAsync: getReportMetric} = useGenerateReportUrl();

  const exportReport = React.useCallback(
    async ({entityId, campaignId, startTime}) => {
      try {
        const campaign = await CampaignAPIRequest.getCampaign({id: campaignId});

        if (campaign?.data?.time_zone?.length) {
          const requestBody = {
            // strategy ID
            source_uuid: entityId,
            report_source: EntityTypes.STRATEGY,
            report_type: ReportTypes.DISTRIBUTION,
            report_by: EntityTypes.STRATEGY,
            // strategy ID
            report_by_uuid: entityId,
            time_unit: DEFAULT_TIME_UNIT,
            // from campaign
            time_zone: TimezoneMappingHai[campaign.data.time_zone],
            // strategy start date
            start_time: convertLocalDateToTimezone({
              localDate: startTime,
              timeZoneOffset: campaign.data.time_zone
            }),
            // now
            end_time: convertLocalDateToTimezone({
              localDate: new Date(),
              timeZoneOffset: campaign.data.time_zone
            })
          };
          try {
            const {data} = await getReportMetric(requestBody);
            const isValid = data?.report && !!Object.keys(data.report).length;

            if (isValid) {
              convertReportResponseToSheetData(data?.report, entityId);
            } else {
              ShowToast.error(`Strategy don't have report data`);
            }
          } catch (error) {
            //
            ShowToast.error(`Strategy don't have report data`);
          }
        }
      } catch (error) {
        //
        ShowToast.error(`Strategy don't have report data`);
      }
    },
    [getReportMetric]
  );

  return {exportReport};
}

function convertReportResponseToSheetData(report, entityId) {
  const sheetData = [];
  let headers = [];
  let tempColumns = [];

  Object.keys(report).forEach(key => {
    if (report[key]?.[entityId]) {
      const getColumnKeys = Object.keys(report[key][entityId]);
      tempColumns = [...tempColumns, ...getColumnKeys];
    }
  });

  const uniqAndSortColumns = __uniq(tempColumns).sort((a, b) =>
    a > b ? 1 : a === b ? 0 : -1
  );
  const capitalAndReplaceUnderscoreColumns = [...uniqAndSortColumns].map(
    column => {
      return capitalize(column.replace(/_/g, ' '));
    }
  );

  headers = ['Date', ...capitalAndReplaceUnderscoreColumns];
  sheetData.push(headers);

  Object.keys(report).forEach(key => {
    if (report[key]?.[entityId]) {
      //
      let data = [];
      uniqAndSortColumns.forEach(col => {
        if (report[key][entityId]?.[col]) {
          data.push(report[key][entityId][col]);
        } else {
          data.push(0);
        }
      });

      sheetData.push([
        moment(parseInt(key, 10) * 1000).format('DD/MM/YYYY'),
        ...data
      ]);
    } else {
      let data = [];
      uniqAndSortColumns.forEach(col => {
        data.push(0);
      });
      sheetData.push([
        moment(parseInt(key, 10) * 1000).format('DD/MM/YYYY'),
        ...data
      ]);
    }
  });
  console.log('---sheetData: ', sheetData);

  const ws = utils.aoa_to_sheet(sheetData);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'report strategy');
  writeFile(wb, `report_strategy_${moment().format('DDMMYYYY')}.xlsx`);
}
