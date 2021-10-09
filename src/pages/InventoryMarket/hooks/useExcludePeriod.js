//---> Build-in modules
import React from 'react';

//---> External modules
import moment from 'moment';

//---> Internal Modules
import {validArray} from 'utils/helpers/dataStructure.helpers';
import {enumerateDaysBetweenDates} from 'utils/helpers/dateTime.helpers';

export function useExcludePeriod({bidsList = [], dsp}) {
  return React.useMemo(() => {
    let listExcudePeriods = [];

    const bidByDsp = bidsList?.filter(item => dsp && item?.dsp_uuid === dsp);
    console.log(
      '🚀 ~ file: useExcludePeriod.js ~ line 7 ~ returnReact.useMemo ~ bidByDsp',
      bidByDsp
    );

    if (!validArray({list: bidByDsp})) {
      return [];
    }

    bidByDsp.forEach((bidItem = {}) => {
      const {start_at, end_at} = bidItem;
      const listDates = enumerateDaysBetweenDates({
        startDate: moment(start_at),
        endDate: moment(end_at),
        formatStr: 'YYYY-MM-DD'
      });
      listExcudePeriods = listDates.map(item => new Date(item));
    });
    console.log(
      '🚀 ~ file: useExcludePeriod.js ~ line 22 ~ bidByDsp.forEach ~ listExcudePeriods',
      listExcudePeriods
    );

    return listExcudePeriods;
  }, [bidsList, dsp]);
}
