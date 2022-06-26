import moment from 'moment-timezone';

export const convertDateTimezone = dateData => {
  if (dateData && dateData instanceof Date) {
    return moment(dateData)
      .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
      .format();
  }

  return null;
};

export const getArrayOfTheLastDays = (
  dayNum = 6,
  noFormat = false,
  ms = false
) => {
  let today = moment().local();
  return [
    noFormat ? (ms ? today.unix() : today.toISOString()) : today.format('Do'),
    ...Array(dayNum)
      .fill()
      .map(() =>
        noFormat
          ? ms
            ? today.subtract(1, 'd').unix()
            : today.subtract(1, 'd').toISOString()
          : today.subtract(1, 'd').format('Do')
      )
  ];
};

export const getArrayOf24HoursOfDay = (noFormat = false, ms = false) => {
  let nowHour = moment().local();
  return [
    noFormat
      ? ms
        ? nowHour.unix()
        : nowHour.toISOString()
      : nowHour.format('HH a'),
    ...Array(23)
      .fill()
      .map(() =>
        noFormat
          ? ms
            ? nowHour.subtract(1, 'h').unix()
            : nowHour.subtract(1, 'h').toISOString()
          : nowHour.subtract(1, 'h').format('HH a')
      )
  ];
};

export const getArrayOfTheWeeks = (
  weekNum = 11,
  noFormat = false,
  ms = false
) => {
  let today = moment().local();
  return [
    noFormat ? (ms ? today.unix() : today.toISOString()) : today.format('W'),
    ...Array(weekNum)
      .fill()
      .map(() =>
        noFormat
          ? ms
            ? today.subtract(1, 'w').unix()
            : today.subtract(1, 'w').toISOString()
          : today.subtract(1, 'w').format('W')
      )
  ];
};

export const countDiffDays = (startDate, endDate) => {
  let _end = moment(endDate).local().endOf('day');
  let start = moment(startDate).local().startOf('day');
  const diff = _end.diff(start);
  const durationAsDays = moment.duration(diff).asDays();
  const count = Math.round(durationAsDays);
  return count;
};

export const getArrayOfDaysBetweenTwoDays = (
  startDate,
  endDate,
  noFormat = false,
  ms = false
) => {
  let end = moment(endDate).local();
  let _end = moment(endDate).local().endOf('day');
  let start = moment(startDate).local().startOf('day');
  const diff = _end.diff(start);
  const durationAsDays = moment.duration(diff).asDays();
  const count = Math.round(durationAsDays);
  if (count < 2) {
    return [
      noFormat ? (ms ? end.unix() : end.toISOString()) : end.format('HH a'),
      ...Array(count * 23)
        .fill()
        .map(() =>
          noFormat
            ? ms
              ? end.subtract(1, 'h').unix()
              : end.subtract(1, 'h').toISOString()
            : end.subtract(1, 'h').format('HH a')
        )
    ];
  }
  return [
    noFormat ? (ms ? end.unix() : end.toISOString()) : end.format('Do'),
    ...Array(count - 1)
      .fill()
      .map(() =>
        noFormat
          ? ms
            ? end.subtract(1, 'd').unix()
            : end.subtract(1, 'd').toISOString()
          : end.subtract(1, 'd').format('Do')
      )
  ];
};

export const startOfDay = (date, ms = false) =>
  ms
    ? moment(date).startOf('day').unix()
    : moment(date).startOf('day').toISOString();
export const endOfDay = date => moment(date).endOf('day').toISOString();
export const startOfHour = (date, ms = false) =>
  ms ? moment(date).endOf('h').unix() : moment(date).endOf('h').toISOString();

export const enumerateDaysBetweenDates = ({
  startDate,
  endDate,
  formatStr,
  unit = 'days',
  increaseNumber = 1
}) => {
  const now = startDate.clone();
  const dates = [];

  while (now.isSameOrBefore(endDate)) {
    dates.push(now.format(formatStr));

    now.add(increaseNumber, unit);
  }
  dates.length = dates.length - 1;

  return dates;
};

export const convertLocalDateToTimezone = ({
  localDate,
  timeZoneOffset = 7,
  isEndDate = false
}) => {
  if (!localDate || !moment(localDate).isValid()) {
    return null;
  }

  // if (!isEndDate) {
  //   return moment(localDate)
  //     .startOfDay()
  //     .utcOffset(timeZoneOffset, true)
  //     .toISOString(true);
  // }
  // return moment(localDate)
  //   .endOfDay()
  //   .utcOffset(timeZoneOffset, true)
  //   .toISOString(true);
  return moment(localDate).utcOffset(timeZoneOffset, true).toISOString(true);
};

export const convertDateToIosStandard = dateStr => {
  if (!dateStr || !moment(dateStr).isValid()) {
    return null;
  }

  return moment(dateStr)?.toISOString();
};
