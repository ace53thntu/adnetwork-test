//---> Build-in modules
import React from 'react';

//---> External modules
import moment from 'moment';

//---> Internal Modules
import {validArray} from 'utils/helpers/dataStructure.helpers';
import {enumerateDaysBetweenDates} from 'utils/helpers/dateTime.helpers';

export function useExcludePeriod({dataList = [], dsp}) {
  return React.useMemo(() => {
    let listExcludePeriods = [];
    let listTmp = [];
    listTmp = [...dataList]?.filter(item => dsp && item?.dsp_uuid === dsp);

    if (!validArray({list: listTmp})) {
      return [];
    }

    [...listTmp].forEach((dataItem = {}) => {
      const {start_time, end_time} = dataItem;
      const listDates = enumerateDaysBetweenDates({
        startDate: moment(start_time),
        endDate: moment(end_time).add(1, 'days'),
        formatStr: 'YYYY-MM-DD'
      });
      listExcludePeriods = [...listExcludePeriods, ...listDates];
    });
    const uniqueDates = [...new Set(listExcludePeriods)];
    const datesList = uniqueDates.map(item => new Date(item)) || [];

    return datesList;
  }, [dataList, dsp]);
}
