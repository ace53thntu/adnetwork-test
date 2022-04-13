import {DISTRIBUTIONS, METRIC_UNITS, REPORT_SOURCES} from 'constants/report';
import {capitalize} from './helpers/string.helpers';
import timezones from 'timezones-list';
import moment from 'moment-timezone';

export const getMetricUnits = () => {
  return METRIC_UNITS.map(item => ({value: item, label: capitalize(item)}));
};

export const getDistributions = () => {
  return DISTRIBUTIONS.map(item => ({value: item, label: capitalize(item)}));
};

export const getReportSources = () => {
  return REPORT_SOURCES.map(item => ({value: item, label: capitalize(item)}));
};

export const generateTimeZoneList = () => {
  console.log('timezones', timezones);
  return timezones?.map(item => {
    const value = item?.utc?.replace(/\b0+/g, '')?.replace(/\b:+/g, '');
    return {
      ...item,
      label: item?.name || 'No name',
      value
    };
  });
};

export const getTimeZoneOffset = () => {
  let timeZone = moment.tz.guess();

  if (timeZone === 'Asia/Saigon') {
    timeZone = 'Asia/Ho_Chi_Minh';
  }
  const timeZoneValue = timezones?.find(
    item => item.tzCode.toLowerCase() === timeZone?.toLowerCase()
  );

  const valueConverted = timeZoneValue?.utc
    ?.replace(/\b0+/g, '')
    ?.replace(/\b:+/g, '');
  return valueConverted || '+7';
};
