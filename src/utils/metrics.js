import {DISTRIBUTIONS, METRIC_UNITS} from 'constants/report';
import {capitalize} from './helpers/string.helpers';

export const getMetricUnits = () => {
  return METRIC_UNITS.map(item => ({value: item, label: capitalize(item)}));
};

export const getDistributions = () => {
  return DISTRIBUTIONS.map(item => ({value: item, label: capitalize(item)}));
};
