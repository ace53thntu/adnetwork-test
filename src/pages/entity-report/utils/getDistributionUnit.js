import moment from 'moment';

const GranuralityList = ['year', 'month', 'day', 'hour', 'minute'];

const DistributionUnits = {
  day: [{value: 'hour', label: 'Hour'}],
  hour: [{value: 'minute', label: 'Minute'}],
  minute: [{value: 'second', label: 'Second'}]
};

const checkUnitToCompare = (startTime, endTime, granularity) => {
  console.log(
    'moment(startTime).isSame(endTime, granularity)',
    moment(startTime).isSame(endTime, granularity),
    granularity
  );
  return {isSame: moment(startTime).isSame(endTime, granularity), granularity};
};

export function getDistributionUnits({startTime, endTime}) {
  if (!startTime || !endTime) {
    return '';
  }

  let granularityGlobal = '';
  try {
    if (moment(startTime).isBefore(moment(endTime))) {
      for (let index = 0; index < GranuralityList.length; index++) {
        const _granularity = GranuralityList[index];
        const {isSame, granularity} = checkUnitToCompare(
          startTime,
          endTime,
          _granularity
        );
        if (!isSame) {
          if (['year', 'month'].includes(granularity)) {
            granularityGlobal = 'day';
          } else {
            granularityGlobal = granularity;
          }
          break;
        }
      }
    }
    console.log('granularityGlobal ====', granularityGlobal);
  } catch (err) {
    throw Error(`Get distribution unit has error: ${err}`);
  }
  return DistributionUnits?.[granularityGlobal] || '';
}
