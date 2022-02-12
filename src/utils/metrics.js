import {DISTRIBUTIONS, METRIC_UNITS} from 'constants/report';
import {capitalize} from './helpers/string.helpers';
import timezones from 'timezones-list';
import moment from 'moment-timezone';

export const getMetricUnits = () => {
  return METRIC_UNITS.map(item => ({value: item, label: capitalize(item)}));
};

export const getDistributions = () => {
  return DISTRIBUTIONS.map(item => ({value: item, label: capitalize(item)}));
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
  const timeZone = moment.tz.guess();
  const timeZoneValue = timezones?.find(
    item => item.tzCode.toLowerCase() === timeZone?.toLowerCase()
  );
  const valueConverted = timeZoneValue?.utc
    ?.replace(/\b0+/g, '')
    ?.replace(/\b:+/g, '');
  return valueConverted;
};
