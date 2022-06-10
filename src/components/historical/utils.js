import {
  BudgetTimeFrames,
  LinearityOptions,
  ProtocolOptions
} from 'constants/misc';
import {
  BandwidthOptions,
  BrowsersOptions,
  DeviceTypeOptions,
  getSkippableOptions,
  OperatingSystemOptions,
  PlacementTypeOptions,
  PlatformOptions,
  PriorityOptions,
  StartDelayOptions,
  StrategySources
} from 'pages/Campaign/constants';
import _ from 'lodash';
import {getListCarriers} from 'utils/helpers/getListCarriers';
import {getBrowserLanguages} from 'utils/helpers/getBrowserLanguages';
import {getListMobilePhoneBrands} from 'utils/helpers/getListMobilePhoneBrands';
import {convertApiToGui} from 'utils/handleCurrencyFields';
import {CappingTypes} from 'constants/misc';

const contextListByField = {
  browser: BrowsersOptions,
  operating_system: OperatingSystemOptions,
  bandwidth: BandwidthOptions,
  mobile_carrier: getListCarriers(),
  browser_language: getBrowserLanguages(),
  device_manufacturer: getListMobilePhoneBrands(),
  device_type: DeviceTypeOptions,
  platform: PlatformOptions
};

const PriceFields = ['cpm_max'];

export const mappingStrategyFields = ({obj, fieldName}) => {
  if (!obj || typeof obj !== 'object' || !Object.keys(obj)) {
    return {
      old: '',
      new: ''
    };
  }

  if (PriceFields[fieldName]) {
    const oldVal = handlePriceField(obj?.old);
    const newVal = handlePriceField(obj?.new);
    return {
      old: oldVal,
      new: newVal
    };
  }

  if (fieldName === 'sources') {
    const oldVal = convertLogObjectToString(obj?.old, StrategySources);
    const newVal = convertLogObjectToString(obj?.new, StrategySources);
    return {
      old: oldVal,
      new: newVal
    };
  }

  if (fieldName === 'priority') {
    const oldVal = findLogLabelFromList({
      value: obj?.old,
      list: PriorityOptions
    });
    const newVal = findLogLabelFromList({
      value: obj?.new,
      list: PriorityOptions
    });

    return {
      old: oldVal,
      new: newVal
    };
  }

  return obj;
};

export const getStrategyVideoFilterLogs = obj => {
  let listLogs = [];
  const oldValue = obj?.old;

  Object.entries(oldValue)?.forEach(([objKey, objValue], index) => {
    const objNewValue = obj?.new?.[objKey];

    if (objKey === 'start_delay') {
      const startDelayOld = findLogLabelFromList({
        list: StartDelayOptions,
        value: objValue
      });
      const startDelayNew = findLogLabelFromList({
        list: StartDelayOptions,
        value: objNewValue
      });

      listLogs.push({
        name: objKey,
        old: startDelayOld,
        new: startDelayNew
      });
    }
    if (objKey === 'protocols') {
      const protocolOld = findLogLabelFromList({
        list: ProtocolOptions,
        value: objValue
      });
      const protocolNew = findLogLabelFromList({
        list: ProtocolOptions,
        value: objNewValue
      });
      listLogs.push({
        name: objKey,
        old: protocolOld,
        new: protocolNew
      });
    }
    if (objKey === 'ptype') {
      const placementTypeOld = findLogLabelFromList({
        list: PlacementTypeOptions,
        value: objValue
      });
      const placementTypeNew = findLogLabelFromList({
        list: PlacementTypeOptions,
        value: objNewValue
      });
      listLogs.push({
        name: objKey,
        old: placementTypeOld,
        new: placementTypeNew
      });
    }
    if (objKey === 'linearity') {
      const linearityOld = findLogLabelFromList({
        list: LinearityOptions,
        value: objValue
      });
      const linearityNew = findLogLabelFromList({
        list: LinearityOptions,
        value: objNewValue
      });
      listLogs.push({
        name: objKey,
        old: linearityOld,
        new: linearityNew
      });
    }
    if (objKey === 'only_skipable') {
      const onlySkippableOld = findLogLabelFromList({
        list: getSkippableOptions('skipable'),
        value: objValue === null ? '' : objValue
      });
      const onlySkippableNew = findLogLabelFromList({
        list: getSkippableOptions('skipable'),
        value: objNewValue === null ? '' : objNewValue
      });
      listLogs.push({
        name: objKey,
        old: onlySkippableOld,
        new: onlySkippableNew
      });
    }
    if (objKey === 'only_unskipable') {
      const onlyUnSkippableOld = findLogLabelFromList({
        list: getSkippableOptions('unskipable'),
        value: objValue === null ? '' : objValue
      });
      const onlyUnSkippableNew = findLogLabelFromList({
        list: getSkippableOptions('unskipable'),
        value: objNewValue === null ? '' : objNewValue
      });
      listLogs.push({
        name: objKey,
        old: onlyUnSkippableOld,
        new: onlyUnSkippableNew
      });
    }
  });

  return listLogs;
};

export const getStrategyContextFilterLogs = obj => {
  let listLogs = [];
  const oldValue = obj?.old;

  Object.entries(oldValue)?.forEach(([objKey, objValue], index) => {
    const objNewValue = obj?.new?.[objKey];
    const list = contextListByField[objKey];
    const oldVal = findLogLabelFromList({
      list: list,
      value: objValue
    });
    const newVal = findLogLabelFromList({
      list: list,
      value: objNewValue
    });
    listLogs.push({
      name: objKey,
      old: oldVal,
      new: newVal
    });
  });

  return listLogs;
};

const handlePriceField = value => {
  if (value === null || value === undefined) {
    return '';
  }

  return convertApiToGui({value});
};

const convertLogObjectToString = (logsData, listData = []) => {
  if (
    logsData &&
    typeof logsData === 'object' &&
    Object.keys(logsData).length
  ) {
    return Object.entries(logsData)?.reduce((acc, [objKey, val]) => {
      if (val) {
        const valueFromList = listData.find(item => item?.value === objKey);
        if (valueFromList) {
          acc = `${acc}, ${valueFromList?.label}`;
        }
      }
      if (acc.indexOf(',') === 0) {
        acc = acc?.substring(1);
      }
      return acc;
    }, '');
  }

  if (typeof logsData === 'string' || typeof logsData === 'number') {
    const valueFromList = listData.find(item => item?.value === logsData);
    return valueFromList?.label || '';
  }

  return '';
};

const findLogLabelFromList = ({list, value}) => {
  if (_.isArray(value)) {
    let logValueParsed = value?.reduce((acc, item) => {
      const foundItem = list.find(listItem => listItem.value === item);
      if (foundItem) {
        acc = `${acc}, ${foundItem?.label}`;
      }
      return acc;
    }, '');
    if (logValueParsed.indexOf(',') === 0) {
      logValueParsed = logValueParsed?.substring(1);
    }
    return logValueParsed;
  }
  const foundObj = list.find(item => item?.value === value);

  return foundObj?.label;
};

export const sortLogs = arr =>
  arr.sort(function (a, b) {
    return a.created_at < b.created_at
      ? 1
      : a.created_at > b.created_at
      ? -1
      : 0;
  });

const getCappingLogByType = ({cappingType, timeFrame, cappingLogs = []}) => {
  const logFilter = [...cappingLogs]?.filter(item => {
    if (
      item?.data?.type === cappingType &&
      item?.data?.time_frame === timeFrame
    ) {
      return true;
    }

    if (
      ![
        CappingTypes.BUDGET.value,
        CappingTypes.BUDGET_MANAGER.value,
        CappingTypes.IMPRESSION.value,
        CappingTypes.USER.value
      ].includes(item?.data?.type) &&
      item?.data?.type === cappingType
    ) {
      return true;
    }

    return false;
  });

  return logFilter?.map((item, index) => {
    const idCompare = logFilter?.[index + 1]?.id || null;

    return {
      ...item,
      action: item?.action === 'delete' ? 'finish' : item?.action,
      id_source: item?.id,
      id_compare: idCompare
    };
  });
};

export const destructureCappingLogList = cappingLogs => {
  const budgetMngGlobal = getCappingLogByType({
    cappingType: CappingTypes.BUDGET_MANAGER.value,
    timeFrame: BudgetTimeFrames.GLOBAL,
    cappingLogs
  });

  const budgetMngDaily = getCappingLogByType({
    cappingType: CappingTypes.BUDGET_MANAGER.value,
    timeFrame: BudgetTimeFrames.DAILY,
    cappingLogs
  });

  const budgetGlobal = getCappingLogByType({
    cappingType: CappingTypes.BUDGET.value,
    timeFrame: BudgetTimeFrames.GLOBAL,
    cappingLogs
  });

  const budgetDaily = getCappingLogByType({
    cappingType: CappingTypes.BUDGET.value,
    timeFrame: BudgetTimeFrames.DAILY,
    cappingLogs
  });
  const impressionGlobal = getCappingLogByType({
    cappingType: CappingTypes.IMPRESSION.value,
    timeFrame: BudgetTimeFrames.GLOBAL,
    cappingLogs
  });

  const impressionDaily = getCappingLogByType({
    cappingType: CappingTypes.IMPRESSION.value,
    timeFrame: BudgetTimeFrames.DAILY,
    cappingLogs
  });

  const userGlobal = getCappingLogByType({
    cappingType: CappingTypes.USER.value,
    timeFrame: BudgetTimeFrames.GLOBAL,
    cappingLogs
  });
  const userDaily = getCappingLogByType({
    cappingType: CappingTypes.USER.value,
    timeFrame: BudgetTimeFrames.DAILY,
    cappingLogs
  });
  const domain = getCappingLogByType({
    cappingType: CappingTypes.DOMAIN.value,
    cappingLogs
  });
  const keyword = getCappingLogByType({
    cappingType: CappingTypes.KEYWORD.value,
    cappingLogs
  });
  const schedule = getCappingLogByType({
    cappingType: CappingTypes.SCHEDULE.value,
    cappingLogs
  });
  return [
    ...budgetMngGlobal,
    ...budgetMngDaily,
    ...budgetGlobal,
    ...budgetDaily,
    ...impressionGlobal,
    ...impressionDaily,
    ...userGlobal,
    ...userDaily,
    ...domain,
    ...keyword,
    ...schedule
  ];
};
