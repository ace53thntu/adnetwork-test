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
import {getUser} from 'utils/helpers/auth.helpers';
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
    async ({entityId, campaignId, startTime, originalStrategy}) => {
      try {
        const campaign = await CampaignAPIRequest.getCampaign({id: campaignId});
        if (campaign?.data?.time_zone?.length) {
          const exportDate = new Date();
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
              localDate: exportDate,
              timeZoneOffset: campaign.data.time_zone
            })
          };
          try {
            const {data} = await getReportMetric(requestBody);
            const isValid = data?.report && !!Object.keys(data.report).length;

            if (isValid) {
              convertReportResponseToSheetData(data?.report, entityId, {
                campaignName: originalStrategy.campaign_name,
                advertiserName: originalStrategy.advertiser_name,
                strategyName: originalStrategy.name,
                startTime,
                exportDate
              });
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

const EXPORT_FIELDS = [
  'creative_bids',
  'creative_impressions',
  'creative_clicks',
  'creative_viewable',
  'video_bids',
  'video_impressions',
  'video_viewable',
  'video_clicks',
  'video_start',
  'video_first_quartil',
  'video_midpoint',
  'video_third_quartil',
  'video_completion',
  'video_skip'
];

function convertReportResponseToSheetData(
  report,
  entityId,
  {
    advertiserName = '',
    campaignName = '',
    strategyName = '',
    startTime,
    exportDate
  }
) {
  let sheetData = [];
  let headers = [];
  // let tempColumns = [];

  // Object.keys(report).forEach(key => {
  //   if (report[key]?.[entityId]) {
  //     const getColumnKeys = Object.keys(report[key][entityId]);
  //     tempColumns = [...tempColumns, ...getColumnKeys];
  //   }
  // });

  const uniqAndSortColumns = __uniq(EXPORT_FIELDS).sort((a, b) =>
    a > b ? 1 : a === b ? 0 : -1
  );
  const capitalAndReplaceUnderscoreColumns = [...uniqAndSortColumns].map(
    column => {
      return capitalize(column.replace(/_/g, ' '));
    }
  );

  headers = ['Date', ...capitalAndReplaceUnderscoreColumns];
  sheetData.push(headers);

  const timeRangeRows = generateTimeRange(startTime, exportDate).sort(
    (a, b) => a - b
  );

  timeRangeRows.forEach(timeCol => {
    if (report?.[timeCol]?.[entityId]) {
      let data = [];
      uniqAndSortColumns.forEach(col => {
        if (report[timeCol][entityId]?.[col]) {
          data.push(report[timeCol][entityId][col]);
        } else {
          data.push(0);
        }
      });

      sheetData.push([formatDateColumn(timeCol), ...data]);
    } else {
      let data = [];
      uniqAndSortColumns.forEach(col => {
        data.push(0);
      });
      sheetData.push([formatDateColumn(timeCol), ...data]);
    }
  });

  // total row
  let totalRow = ['Total'];
  sheetData.forEach((row, rowIndex) => {
    if (rowIndex > 0) {
      row.forEach((col, colIndex) => {
        if (colIndex > 0) {
          if (totalRow[colIndex] !== undefined) {
            totalRow[colIndex] += col;
          } else {
            totalRow.push(col);
          }
        }
      });
    }
  });
  sheetData.push(totalRow);

  const advertiserNameRow = ['Advertiser name', advertiserName];
  const campaignNameRow = ['Campaign name', campaignName];
  const strategyNameRow = ['Strategy name', strategyName];
  const exportDateTimeRow = ['Export Date/Time', formatDateTime(exportDate)];
  const dateRangeRow = [
    'Date range',
    `${formatDate(startTime)}-${formatDate(exportDate)}`
  ];
  const user = getUser();
  const userRow = ['User', user.email];

  sheetData = [
    ['', ''],
    advertiserNameRow,
    campaignNameRow,
    strategyNameRow,
    exportDateTimeRow,
    dateRangeRow,
    userRow,
    ['', ''],
    ...sheetData
  ];

  // write file
  writeFileToExport(sheetData);
}

function formatDateColumn(date) {
  return formatDate(parseInt(date, 10) * 1000);
}

function formatDate(date) {
  return moment(date).format('DD/MM/YYYY');
}

function formatDateTime(dateTime) {
  return moment(dateTime).format('DD/MM/YYYY HH:mm');
}

function writeFileToExport(sheetData) {
  const ws = utils.aoa_to_sheet(sheetData);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'report strategy');
  writeFile(wb, `report_strategy_${new Date().getTime()}.xlsx`);
}

function generateTimeRange(startDate, exportDate) {
  let end = moment(exportDate).local();
  let _end = moment(exportDate).local().endOf('day');
  let start = moment(startDate).local().startOf('day');
  const diff = _end.diff(start);
  const durationAsDays = moment.duration(diff).asDays();
  const count = Math.round(durationAsDays);

  const res = [
    end.startOf('day').unix(),
    ...Array(count - 1)
      .fill()
      .map(() => end.subtract(1, 'd').startOf('day').unix())
  ];

  return res;
}
