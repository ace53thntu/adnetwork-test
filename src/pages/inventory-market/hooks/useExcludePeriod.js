//---> Build-in modules
import React from 'react';

//---> External modules
import moment from 'moment';

//---> Internal Modules
import {validArray} from 'utils/helpers/dataStructure.helpers';
import {enumerateDaysBetweenDates} from 'utils/helpers/dateTime.helpers';

export function useExcludePeriod({dataList = [], dsp}) {
  console.log(
    '🚀 ~ file: useExcludePeriod.js ~ line 12 ~ useExcludePeriod ~ dsp',
    dsp
  );
  console.log(
    '🚀 ~ file: useExcludePeriod.js ~ line 12 ~ useExcludePeriod ~ dataList',
    dataList
  );
  return React.useMemo(() => {
    let listExcludePeriods = [];
    let listTmp = [];

    listTmp = [...dataList]?.filter(item => dsp && item?.dsp_uuid === dsp);
    console.log(
      '🚀 ~ file: useExcludePeriod.js ~ line 25 ~ returnReact.useMemo ~ listTmp',
      listTmp
    );

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
      console.log(
        '🚀 ~ file: useExcludePeriod.js ~ line 32 ~ bidByDsp.forEach ~ listDates',
        start_time,
        end_time,
        listDates
      );
      listExcludePeriods = [...listExcludePeriods, ...listDates];
    });
    const uniqueDates = [...new Set(listExcludePeriods)];
    const datesList = uniqueDates.map(item => new Date(item)) || [];

    console.log(
      '🚀 ~ file: useExcludePeriod.js ~ line 22 ~ bidByDsp.forEach ~ listExcludePeriods',
      listExcludePeriods,
      datesList
    );
    return datesList;
  }, [dataList, dsp]);
}
