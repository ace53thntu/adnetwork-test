import moment from 'moment';

const GranularityList = ['year', 'month', 'week', 'day', 'hour', 'minute'];

const DistributionUnits = {
  global: [
    {value: 'year', label: 'Year'},
    {value: 'month', label: 'Month'},
    {value: 'week', label: 'Week'},
    {value: 'day', label: 'Day'}
  ],
  year: [
    {value: 'month', label: 'Month'},
    {value: 'week', label: 'Week'},
    {value: 'day', label: 'Day'}
  ],
  month: [{value: 'day', label: 'Day'}],
  week: [{value: 'day', label: 'Day'}],
  day: [{value: 'hour', label: 'Hour'}],
  hour: [{value: 'minute', label: 'Minute'}],
  minute: [{value: 'second', label: 'Second'}]
};

const checkUnitToCompare = (startTime, endTime, granularity) => {
  return {isSame: moment(startTime).isSame(endTime, granularity), granularity};
};

export function getDistributionUnits({startTime, endTime}) {
  if (!startTime || !endTime) {
    return '';
  }

  let granularityGlobal = '';
  try {
    if (moment(startTime).isBefore(moment(endTime))) {
      for (let index = 0; index < GranularityList.length; index++) {
        const _granularity = GranularityList[index];
        const {isSame, granularity} = checkUnitToCompare(
          startTime,
          endTime,
          _granularity
        );

        if (!isSame) {
          granularityGlobal = granularity;
          break;
        }
      }
    }
  } catch (err) {
    throw Error(`Get distribution unit has error: ${err}`);
  }
  return DistributionUnits?.[granularityGlobal] || '';
}
