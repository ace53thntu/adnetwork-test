import moment from 'moment';

export const isValidTimePeriod = ({startTime, endTime}) => {
  return startTime && endTime && moment(startTime).isBefore(moment(endTime))
    ? true
    : false;
};
