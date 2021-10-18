//---> Build-in modules
import React from 'react';

//---> External modules
import moment from 'moment';

//---> Internal Modules
import {validArray} from 'utils/helpers/dataStructure.helpers';
import {enumerateDaysBetweenDates} from 'utils/helpers/dateTime.helpers';

export function useExcludePeriod({dataList = [], dsp}) {
  return React.useMemo(() => {
    let listExcudePeriods = [];
    let listTmp = [];

    listTmp = [...dataList]?.filter(item => dsp && item?.dsp_uuid === dsp);

    if (!validArray({list: listTmp})) {
      return [];
    }

    [...listTmp].forEach((dataItem = {}) => {
      const {start_at, end_at} = dataItem;
      const listDates = enumerateDaysBetweenDates({
        startDate: moment(start_at),
        endDate: moment(end_at).add(1, 'days'),
        formatStr: 'YYYY-MM-DD'
      });
      console.log(
        '🚀 ~ file: useExcludePeriod.js ~ line 32 ~ bidByDsp.forEach ~ listDates',
        start_at,
        end_at,
        listDates
      );
      listExcudePeriods = [...listExcudePeriods, ...listDates];
    });
    const uniqueDates = [...new Set(listExcudePeriods)];
    const datesList = uniqueDates.map(item => new Date(item)) || [];

    console.log(
      '🚀 ~ file: useExcludePeriod.js ~ line 22 ~ bidByDsp.forEach ~ listExcudePeriods',
      listExcudePeriods,
      datesList
    );
    return datesList;
  }, [dataList, dsp]);
}
